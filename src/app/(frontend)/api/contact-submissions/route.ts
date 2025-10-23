import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/utilities/getPayloadInstance'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const body = await request.json()

    // Form verilerini doğrula
    const { firstName, lastName, email, phone, visaType, subject, message, preferredContact, urgency } = body

    if (!firstName || !lastName || !email || !visaType || !subject || !message) {
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

    // Contact submission'ı oluştur
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

    // Email bildirimi gönder (admin'e) - Şimdilik console.log ile test
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

    // Email gönderme (şimdilik devre dışı - email provider konfigürasyonu gerekli)
    // try {
    //   await payload.sendEmail({
    //     to: process.env.ADMIN_EMAIL || 'basaryldrm1237@gmail.com',
    //     from: process.env.FROM_EMAIL || 'noreply@ukvisa.com',
    //     subject: `Yeni Contact Form Gönderimi - ${subject}`,
    //     html: `
    //       <h2>Yeni Contact Form Gönderimi</h2>
    //       <p><strong>Ad Soyad:</strong> ${firstName} ${lastName}</p>
    //       <p><strong>Email:</strong> ${email}</p>
    //       <p><strong>Telefon:</strong> ${phone || 'Belirtilmemiş'}</p>
    //       <p><strong>Visa Tipi:</strong> ${visaType}</p>
    //       <p><strong>Konu:</strong> ${subject}</p>
    //       <p><strong>Mesaj:</strong></p>
    //       <p>${message}</p>
    //       <p><strong>Tercih Edilen İletişim:</strong> ${preferredContact}</p>
    //       <p><strong>Acil Durum:</strong> ${urgency}</p>
    //       <p><strong>Gönderim Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}</p>
    //     `,
    //   })
    // } catch (emailError) {
    //   console.error('Email gönderim hatası:', emailError)
    // }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form başarıyla gönderildi',
        id: contactSubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const { searchParams } = new URL(request.url)
    
    // Payload CMS'in beklediği format: where[and][0][id][in][0]=1
    const whereParam = searchParams.get('where[and][0][id][in][0]')
    const id = whereParam

    if (!id) {
      return NextResponse.json(
        { error: 'ID parametresi gerekli' },
        { status: 400 }
      )
    }

    // Contact submission'ı sil
    await payload.delete({
      collection: 'contact-submissions',
      id: id,
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact submission başarıyla silindi'
      },
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

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const id = searchParams.get('id')
    
    // Tek bir submission getir veya tümünü getir
    let contactSubmissions
    if (id) {
      // Tek submission getir
      const submission = await payload.findByID({
        collection: 'contact-submissions',
        id: id,
      })
      contactSubmissions = {
        docs: [submission],
        totalDocs: 1
      }
    } else {
      // Tüm contact submissions'ları getir
      contactSubmissions = await payload.find({
        collection: 'contact-submissions',
        limit: 0, // Tüm kayıtları getir
        sort: '-createdAt', // En yeni önce
      })
    }

    if (format === 'csv') {
      // CSV formatında export
      const csvHeaders = [
        'ID',
        'Ad',
        'Soyad', 
        'Email',
        'Telefon',
        'Visa Tipi',
        'Konu',
        'Mesaj',
        'Tercih Edilen İletişim',
        'Acil Durum',
        'Durum',
        'Admin Notları',
        'Oluşturulma Tarihi',
        'Güncellenme Tarihi'
      ]

      const csvRows = contactSubmissions.docs.map(submission => [
        submission.id,
        submission.firstName,
        submission.lastName,
        submission.email,
        submission.phone || '',
        submission.visaType,
        submission.subject,
        submission.message.replace(/\n/g, ' ').replace(/,/g, ';'), // Virgül ve yeni satır karakterlerini temizle
        submission.preferredContact,
        submission.urgency,
        submission.status,
        submission.adminNotes || '',
        new Date(submission.createdAt).toLocaleString('tr-TR'),
        new Date(submission.updatedAt).toLocaleString('tr-TR')
      ])

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n')

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="contact-submissions-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // JSON formatında döndür
    return NextResponse.json({
      success: true,
      data: contactSubmissions.docs,
      total: contactSubmissions.totalDocs
    })

  } catch (error) {
    console.error('Contact submissions export error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
