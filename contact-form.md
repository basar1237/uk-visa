# Contact Form - Detaylı POST İşlemi Rehberi

## 📋 Genel Bakış

Bu dokümantasyon, UK Visa projesindeki Contact Form'unun POST işlemini nasıl gerçekleştirdiğini detaylı olarak açıklar. Form verileri Payload CMS'e kaydedilir ve admin panel'de yönetilebilir.

## 🏗️ Sistem Mimarisi

```
Frontend Form → API Endpoint → Payload CMS → Database
     ↓              ↓              ↓           ↓
ContactComponent → /api/contact-submissions → ContactSubmissions → PostgreSQL
```

## 📁 Dosya Yapısı

```
src/
├── app/(frontend)/
│   ├── contact/
│   │   ├── page.tsx                    # Contact sayfası
│   │   └── ContactComponent.tsx        # Form component'i
│   └── api/
│       └── contact-submissions/
│           └── route.ts                # API endpoint
├── collections/
│   └── ContactSubmissions/
│       └── index.ts                    # Collection schema
└── components/
    └── ContactSubmissionExportField/
        └── index.tsx                   # Export component
```

## 🔧 1. Collection Tanımı

### Dosya: `src/collections/ContactSubmissions/index.ts`

```typescript
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'email', 'visaType', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    create: () => true, // Herkes form gönderebilir
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return false
    },
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: 'First Name',
    },
    {
      name: 'lastName', 
      type: 'text',
      required: true,
      label: 'Last Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'visaType',
      type: 'select',
      required: true,
      options: [
        { label: 'Student Visa', value: 'student' },
        { label: 'Work Visa', value: 'work' },
        { label: 'Tourist Visa', value: 'tourist' },
        { label: 'Family Visa', value: 'family' },
        { label: 'Other', value: 'other' }
      ],
      label: 'Visa Type',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'preferredContact',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' }
      ],
      defaultValue: 'email',
      label: 'Preferred Contact Method',
    },
    {
      name: 'urgency',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' }
      ],
      defaultValue: 'normal',
      label: 'Urgency Level',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Closed', value: 'closed' }
      ],
      defaultValue: 'new',
      required: true,
      label: 'Status',
    },
    {
      name: 'exportActions',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/ContactSubmissionExportField',
        },
      },
    },
  ],
  timestamps: true,
}
```

## 🌐 2. API Endpoint

### Dosya: `src/app/(frontend)/api/contact-submissions/route.ts`

#### POST İşlemi - Form Verilerini Kaydetme

```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Payload instance'ını al
    const payload = await getPayloadInstance()
    
    // 2. Request body'den verileri çıkar
    const body = await request.json()
    
    // 3. Form verilerini doğrula
    const { firstName, lastName, email, phone, visaType, subject, message, preferredContact, urgency } = body

    // 4. Gerekli alanları kontrol et
    if (!firstName || !lastName || !email || !visaType || !subject || !message) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    // 5. Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçersiz email formatı' },
        { status: 400 }
      )
    }

    // 6. Contact submission'ı oluştur
    const contactSubmission = await payload.create({
      collection: 'contact-submissions',
      data: {
        firstName,
        lastName,
        email,
        phone: phone || '',
        visaType,
        subject,
        message,
        preferredContact: preferredContact || 'email',
        urgency: urgency || 'normal',
        status: 'new',
      },
    })

    // 7. Console'a log yazdır (admin bildirimi)
    console.log('=== YENİ CONTACT FORM GÖNDERİMİ ===')
    console.log('Ad Soyad:', firstName, lastName)
    console.log('Email:', email)
    console.log('Telefon:', phone || 'Belirtilmemiş')
    console.log('Visa Tipi:', visaType)
    console.log('Konu:', subject)
    console.log('Mesaj:', message)
    console.log('Tercih Edilen İletişim:', preferredContact)
    console.log('Acil Durum:', urgency)
    console.log('Gönderim Tarihi:', new Date().toLocaleString('tr-TR'))
    console.log('=====================================')

    // 8. Başarılı response döndür
    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form başarıyla gönderildi',
        id: contactSubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    // 9. Hata durumunda error response
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { 
        error: 'Sunucu hatası',
        details: error.message
      },
      { status: 500 }
    )
  }
}
```

#### GET İşlemi - Verileri Çekme ve Export

```typescript
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const id = searchParams.get('id')

    let submissions

    if (id) {
      // Tek bir submission getir
      const submission = await payload.findByID({
        collection: 'contact-submissions',
        id: parseInt(id),
      })
      submissions = [submission]
    } else {
      // Tüm submission'ları getir
      const result = await payload.find({
        collection: 'contact-submissions',
        limit: 1000,
        sort: '-createdAt',
      })
      submissions = result.docs
    }

    if (format === 'csv') {
      // CSV formatında export
      const headers = [
        'ID', 'First Name', 'Last Name', 'Email', 'Phone', 
        'Visa Type', 'Subject', 'Message', 'Preferred Contact', 
        'Urgency', 'Status', 'Created At'
      ]

      const csvRows = [headers.join(',')]

      submissions.forEach(submission => {
        const row = [
          submission.id,
          `"${submission.firstName}"`,
          `"${submission.lastName}"`,
          `"${submission.email}"`,
          `"${submission.phone || ''}"`,
          `"${submission.visaType}"`,
          `"${submission.subject}"`,
          `"${submission.message}"`,
          `"${submission.preferredContact}"`,
          `"${submission.urgency}"`,
          submission.status,
          new Date(submission.createdAt).toLocaleString('tr-TR')
        ]
        csvRows.push(row.join(','))
      })

      const csvContent = csvRows.join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="contact-submissions-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // JSON formatında döndür
    return NextResponse.json(submissions)

  } catch (error) {
    console.error('Contact submissions fetch error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
```

#### DELETE İşlemi - Submission Silme

```typescript
export async function DELETE(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID gerekli' },
        { status: 400 }
      )
    }

    await payload.delete({
      collection: 'contact-submissions',
      id: parseInt(id),
    })

    return NextResponse.json(
      { success: true, message: 'Contact submission silindi' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact submission delete error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
```

## 🎨 3. Frontend Component

### Dosya: `src/app/(frontend)/contact/ContactComponent.tsx`

#### Form State Yönetimi

```typescript
interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  visaType: string
  subject: string
  message: string
  preferredContact: string
  urgency: string
}

const ContactComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visaType: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
```

#### Form Submit İşlemi

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setSubmitStatus('idle')

  try {
    // 1. Form verilerini API'ye gönder
    const response = await fetch('/api/contact-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    // 2. Response'u kontrol et
    if (response.ok) {
      const data = await response.json()
      console.log('Form submitted successfully:', data)
      setSubmitStatus('success')
      
      // 3. Form'u temizle
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        visaType: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      })
    } else {
      // 4. Hata durumunda
      const errorData = await response.json()
      console.error('Form submission failed:', errorData)
      setSubmitStatus('error')
    }
  } catch (error) {
    // 5. Network hatası
    console.error('Form submission error:', error)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
  }
}
```

#### Form Render

```typescript
return (
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* First Name */}
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
        First Name *
      </label>
      <input
        type="text"
        id="firstName"
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Last Name */}
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
        Last Name *
      </label>
      <input
        type="text"
        id="lastName"
        value={formData.lastName}
        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Email */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email Address *
      </label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Phone */}
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Visa Type */}
    <div>
      <label htmlFor="visaType" className="block text-sm font-medium text-gray-700">
        Visa Type *
      </label>
      <select
        id="visaType"
        value={formData.visaType}
        onChange={(e) => setFormData({...formData, visaType: e.target.value})}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Visa Type</option>
        <option value="student">Student Visa</option>
        <option value="work">Work Visa</option>
        <option value="tourist">Tourist Visa</option>
        <option value="family">Family Visa</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Subject */}
    <div>
      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
        Subject *
      </label>
      <input
        type="text"
        id="subject"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Message */}
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Message *
      </label>
      <textarea
        id="message"
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Preferred Contact */}
    <div>
      <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700">
        Preferred Contact Method
      </label>
      <select
        id="preferredContact"
        value={formData.preferredContact}
        onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
    </div>

    {/* Urgency */}
    <div>
      <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
        Urgency Level
      </label>
      <select
        id="urgency"
        value={formData.urgency}
        onChange={(e) => setFormData({...formData, urgency: e.target.value})}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </div>

    {/* Status Messages */}
    {submitStatus === 'success' && (
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <p className="text-green-800">Message sent successfully! We'll get back to you soon.</p>
      </div>
    )}

    {submitStatus === 'error' && (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Failed to send message. Please try again.</p>
      </div>
    )}
  </form>
)
```

## 📊 4. Admin Panel Yönetimi

### Collection Admin Ayarları

```typescript
admin: {
  useAsTitle: 'firstName',  // Liste başlığı
  defaultColumns: ['firstName', 'lastName', 'email', 'visaType', 'createdAt'],
  group: 'Submissions',     // Admin panel'de gruplandırma
}
```

### Access Control

```typescript
access: {
  create: () => true,                    // Herkes form gönderebilir
  read: ({ req: { user } }) => {
    if (user?.role === 'admin') return true  // Sadece admin okuyabilir
    return false
  },
  update: ({ req: { user } }) => user?.role === 'admin',
  delete: ({ req: { user } }) => user?.role === 'admin',
}
```

## 🔄 5. POST İşlemi Adım Adım

### 1. Kullanıcı Form Doldurur
```
Kullanıcı → ContactComponent → Form State
```

### 2. Form Submit Edilir
```
handleSubmit() → fetch('/api/contact-submissions', { method: 'POST' })
```

### 3. API Endpoint Çalışır
```
POST /api/contact-submissions → route.ts → payload.create()
```

### 4. Payload CMS İşlemi
```
payload.create() → ContactSubmissions collection → PostgreSQL
```

### 5. Response Döner
```
Success: { success: true, id: 123 }
Error: { error: 'Sunucu hatası' }
```

### 6. Frontend Güncellenir
```
Success → Form temizlenir, success mesajı
Error → Error mesajı gösterilir
```

## 📈 6. Veri Akışı Diyagramı

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Endpoint    │    │   Payload CMS   │    │   Database      │
│   Component     │    │   /api/contact-   │    │   Collection    │    │   PostgreSQL    │
│                 │    │   submissions     │    │                 │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │                        │
         │ 1. Form Submit         │                        │                        │
         ├───────────────────────►│                        │                        │
         │                        │                        │                        │
         │                        │ 2. Validate Data       │                        │
         │                        ├───────────────────────►│                        │
         │                        │                        │                        │
         │                        │                        │ 3. Create Record       │
         │                        │                        ├───────────────────────►│
         │                        │                        │                        │
         │                        │                        │ 4. Return ID           │
         │                        │                        ◄───────────────────────┤
         │                        │                        │                        │
         │                        │ 5. Return Response     │                        │
         │                        ◄───────────────────────┤                        │
         │                        │                        │                        │
         │ 6. Update UI           │                        │                        │
         ◄───────────────────────┤                        │                        │
```

## 🛠️ 7. Hata Yönetimi

### Frontend Hata Yönetimi

```typescript
try {
  const response = await fetch('/api/contact-submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (response.ok) {
    // Başarılı
    setSubmitStatus('success')
  } else {
    // HTTP hatası
    const errorData = await response.json()
    console.error('Form submission failed:', errorData)
    setSubmitStatus('error')
  }
} catch (error) {
  // Network hatası
  console.error('Form submission error:', error)
  setSubmitStatus('error')
}
```

### Backend Hata Yönetimi

```typescript
try {
  // Form verilerini doğrula
  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: 'Gerekli alanlar eksik' },
      { status: 400 }
    )
  }

  // Email formatını kontrol et
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Geçersiz email formatı' },
      { status: 400 }
    )
  }

  // Payload'a kaydet
  const contactSubmission = await payload.create({
    collection: 'contact-submissions',
    data: { /* form data */ }
  })

  return NextResponse.json({ success: true, id: contactSubmission.id })

} catch (error) {
  console.error('Contact form submission error:', error)
  return NextResponse.json(
    { error: 'Sunucu hatası', details: error.message },
    { status: 500 }
  )
}
```

## 📤 8. Export İşlemleri

### Individual Export

```typescript
// ContactSubmissionExportField component
const handleExport = async (format: 'csv' | 'json') => {
  try {
    const pathParts = window.location.pathname.split('/')
    const id = pathParts[pathParts.length - 1]
    
    const response = await fetch(`/api/contact-submissions?format=${format}&id=${id}`)
    
    if (format === 'csv') {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `contact-submission-${id}-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  } catch (error) {
    console.error('Export error:', error)
    alert('Export işlemi sırasında hata oluştu')
  }
}
```

## 🔍 9. Debug ve Loglama

### Console Logları

```typescript
// API endpoint'te
console.log('=== YENİ CONTACT FORM GÖNDERİMİ ===')
console.log('Ad Soyad:', firstName, lastName)
console.log('Email:', email)
console.log('Telefon:', phone || 'Belirtilmemiş')
console.log('Visa Tipi:', visaType)
console.log('Konu:', subject)
console.log('Mesaj:', message)
console.log('Tercih Edilen İletişim:', preferredContact)
console.log('Acil Durum:', urgency)
console.log('Gönderim Tarihi:', new Date().toLocaleString('tr-TR'))
console.log('=====================================')
```

### Error Logging

```typescript
console.error('Contact form submission error:', error)
console.error('Error details:', {
  message: error.message,
  stack: error.stack,
  name: error.name
})
```

## 🚀 10. Test Senaryoları

### Başarılı Form Gönderimi

1. **Form Doldurma:**
   - firstName: "John"
   - lastName: "Doe"
   - email: "john@example.com"
   - visaType: "student"
   - subject: "Visa Question"
   - message: "I need help with my visa application"

2. **Beklenen Sonuç:**
   - Status: 201 Created
   - Response: `{ success: true, id: 123 }`
   - Database: Yeni kayıt oluşturulur
   - Console: Log mesajları görünür

### Hata Senaryoları

1. **Eksik Alanlar:**
   - firstName boş → 400 Bad Request
   - Response: `{ error: 'Gerekli alanlar eksik' }`

2. **Geçersiz Email:**
   - email: "invalid-email" → 400 Bad Request
   - Response: `{ error: 'Geçersiz email formatı' }`

3. **Server Hatası:**
   - Database bağlantı hatası → 500 Internal Server Error
   - Response: `{ error: 'Sunucu hatası' }`

## 📋 11. Özet

Contact Form POST işlemi şu adımları takip eder:

1. **Frontend:** Kullanıcı form doldurur ve submit eder
2. **API:** `/api/contact-submissions` endpoint'i çalışır
3. **Validation:** Form verileri doğrulanır
4. **Payload:** `ContactSubmissions` collection'ına kaydedilir
5. **Database:** PostgreSQL'e yazılır
6. **Response:** Başarı/hata mesajı döner
7. **UI:** Frontend güncellenir

Bu sistem sayesinde contact form verileri güvenli bir şekilde toplanır, admin panel'de yönetilir ve export edilebilir.
