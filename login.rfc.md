# RFC: Public User Authentication System
## Kullanıcı Kayıt, Giriş ve Oturum Yönetimi

**Tarih:** 2025-01-14  
**Durum:** Öneri (Proposal)  
**Öncelik:** Orta  
**Tahmini Süre:** 4-6 saat

---

## 📋 Özet

UK Visa Solutions web sitesi için public (ziyaretçiler) kullanıcılarının kayıt olup giriş yapabileceği bir authentication sistemi kurulması.

---

## 🎯 Amaç

- Ziyaretçilerin siteye kayıt olabilmesi
- Kullanıcıların email/password ile giriş yapabilmesi  
- Kullanıcı oturum yönetimi (login/logout)
- Gelecekte özelleştirilmiş kullanıcı dashboard'u için temel

---

## 🏗️ Teknik Mimari

### Mevcut Durum
- ✅ Payload CMS'de `Users` collection mevcut
- ✅ Admin paneli authentication çalışıyor (`/admin`)
- ❌ Public authentication yok
- ❌ Frontend login/register sayfaları yok

### Önerilen Sistem

#### 1. Collection Yapısı

**Yeni Collection: `PublicUsers` (veya mevcut `Users` collection'ı genişletme)**

İki seçenek var:

**Seçenek A: Yeni PublicUsers Collection (Önerilen)**
- Admin users ve public users ayrı tutulur
- Farklı access kontrolü
- Daha güvenli ve sade

**Seçenek B: Mevcut Users Collection'ı Genişletme**
- Tek collection içinde hem admin hem public users
- Role-based access control (`admin`, `user`)
- Daha az kod tekrarı

**Önerilen:** Seçenek A (PublicUsers collection)

```typescript
// src/collections/PublicUsers/index.ts
export const PublicUsers: CollectionConfig = {
  slug: 'public-users',
  access: {
    admin: authenticated, // Sadece admin görebilir
    create: () => true,   // Herkes kayıt olabilir
    delete: authenticated,
    read: (req) => {
      // Kullanıcı sadece kendi profilini görebilir
      if (req.user && req.user.id) {
        return { id: { equals: req.user.id } }
      }
      return false
    },
    update: (req) => {
      // Kullanıcı sadece kendi profilini güncelleyebilir
      return req.user ? { id: { equals: req.user.id } } : false
    },
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    // Email ve password otomatik ekleniyor (auth: true ile)
  ],
  timestamps: true,
}
```

#### 2. Frontend Sayfaları

```
src/app/(frontend)/
├── login/
│   └── page.tsx          # Giriş sayfası
├── register/
│   └── page.tsx          # Kayıt sayfası
├── dashboard/            # Kullanıcı paneli (gelecekte)
│   └── page.tsx
└── forgot-password/      # Şifre sıfırlama (opsiyonel)
    └── page.tsx
```

#### 3. API Endpoints (Payload otomatik oluşturur)

```
POST /api/public-users/login           # Giriş
POST /api/public-users/register        # Kayıt
POST /api/public-users/me              # Mevcut kullanıcı bilgisi
POST /api/public-users/forgot-password # Şifre sıfırlama (opsiyonel)
POST /api/public-users/reset-password  # Yeni şifre belirleme (opsiyonel)
```

#### 4. Authentication Yönetimi

**Cookie-based authentication** (Payload default)
- Access token JWT olarak cookie'de saklanır
- Secure, HttpOnly, SameSite cookie ayarları
- Otomatik token yenileme desteği

---

## 📁 Dosya Yapısı

```
src/
├── collections/
│   └── PublicUsers/
│       ├── index.ts                  # Collection tanımı
│       └── hooks.ts                  # Validation hooks (opsiyonel)
├── app/(frontend)/
│   ├── login/
│   │   └── page.tsx                  # Login sayfası
│   ├── register/
│   │   └── page.tsx                  # Register sayfası
│   └── dashboard/
│       ├── page.tsx                  # Kullanıcı dashboard
│       └── layout.tsx                # Protected route layout
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx             # Login form component
│   │   ├── RegisterForm.tsx          # Register form component
│   │   └── AuthProvider.tsx          # Context API ile auth state
│   └── ui/
│       └── ProtectedRoute.tsx        # Protected route wrapper
└── utilities/
    └── auth.ts                       # Authentication helper functions
```

---

## 🔧 Implementation Adımları

### Adım 1: Collection Oluşturma
1. `src/collections/PublicUsers/index.ts` oluştur
2. Payload config'e ekle: `collections: [...PublicUsers]`
3. Type generation: `pnpm payload generate:types`

### Adım 2: Frontend Sayfaları
1. `/login` sayfası oluştur
2. `/register` sayfası oluştur
3. Form components oluştur (LoginForm, RegisterForm)

### Adım 3: Authentication Context
1. React Context ile global auth state
2. User data ve login/logout fonksiyonları
3. Protected route logic

### Adım 4: Header Integration
1. Header'a login/register linkleri ekle
2. Logged in kullanıcı için kullanıcı menüsü
3. Logout butonu

### Adım 5: Testing & Polish
1. Form validation
2. Error handling
3. Loading states
4. Success messages
5. Mobile responsive

---

## 🎨 UI/UX Tasarım Önerileri

### Login Sayfası
- Email input
- Password input
- "Remember me" checkbox
- "Forgot password?" link
- "Create an account" link
- Submit button
- Error messages (kırmızı toast)
- Success feedback

### Register Sayfası
- Name input
- Email input
- Phone input (opsiyonel)
- Password input
- Confirm password input
- "I agree to terms" checkbox
- Submit button
- Account başarılı oluşturulduktan sonra auto-redirect to dashboard

### Header Integration
```
[Logged Out]
Logo | Nav Links | [Login] [Register]

[Logged In]
Logo | Nav Links | 👤 John Doe ▼
                      ├─ Dashboard
                      ├─ Profile
                      └─ Logout
```

---

## 🔒 Güvenlik

1. **Password Requirements**
   - Minimum 8 karakter
   - Büyük/küçük harf, sayı, özel karakter (opsiyonel)
   - Payload otomatik hash'ler (bcrypt)

2. **Email Verification** (gelecek versiyon)
   - Kayıt sonrası email doğrulama
   - Verified/unverified user durumu

3. **Rate Limiting**
   - Login attempts sınırı (örn: 5 deneme)
   - Payload'un built-in lock functionality

4. **CSRF Protection**
   - Payload otomatik sağlar
   - Next.js CSRF tokens

5. **Secure Cookies**
   - HttpOnly, Secure, SameSite flags
   - Expiry time management

---

## 📊 Veri Modeli

```typescript
interface PublicUser {
  id: number
  name: string
  email: string
  phone?: string
  country?: string
  hash: string          // Payload ekler
  salt: string          // Payload ekler
  createdAt: string
  updatedAt: string
  // Auth fields (Payload ekler):
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
}
```

---

## 🔗 İlgili Sistemler

### Mevcut Connections
- **Contact Submissions**: Kullanıcı başvurularını kaydedebiliriz
- **Eligibility Submissions**: Kullanıcılar kendi testlerini görebilir
- **Forms**: Doldurulan formları kullanıcıya bağlayabiliriz

### Gelecek Özellikler
- User dashboard
- Başvuru takibi
- Favori visa türleri
- Kişiselleştirilmiş öneriler
- Email notifications

---

## ⚠️ Riskler ve Dikkat Edilmesi Gerekenler

### Riskler
1. **Existing Admin Users**: Public users ile karışmamalı
2. **Email Conflicts**: Aynı email hem admin hem public'te olmamalı
3. **Data Privacy**: GDPR uyumluluğu
4. **Spam Accounts**: Rate limiting ve email verification

### Çözümler
- Admin ve Public users ayrı collection'larda
- Email unique constraint
- Privacy policy ve GDPR compliance
- Email verification, CAPTCHA (gelecek)

---

## 📈 Success Metrics

- ✅ Kullanıcılar kayıt olabiliyor
- ✅ Kullanıcılar giriş yapabiliyor
- ✅ Session yönetimi çalışıyor
- ✅ Logout çalışıyor
- ✅ Error handling doğru
- ✅ Mobile responsive
- ⏳ Email verification (v2)
- ⏳ User dashboard (v2)

---

## 🚀 Next Steps (Gelecek Versiyonlar)

### v1.1 - Enhanced Security
- Email verification
- Password strength indicator
- Two-factor authentication

### v1.2 - User Dashboard
- Başvuru geçmişi
- Saved eligibility tests
- Profile management
- Email preferences

### v1.3 - Social Login
- Google login
- Facebook login
- Apple login

---

## 📝 Referanslar

- [Payload CMS Auth](https://payloadcms.com/docs/authentication/overview)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Payload Access Control](https://payloadcms.com/docs/access-control/overview)

---

## ✅ Onay

- [ ] Teknik review
- [ ] UI/UX review
- [ ] Security review
- [ ] Final approval

---

**Not:** Bu RFC sadece tasarım ve planlama amaçlıdır. Implementasyon için ayrı adımlar takip edilecektir.
