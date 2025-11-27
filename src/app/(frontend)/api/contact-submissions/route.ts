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

    // Gmail Apps Script ile email gönderme
    const appsScriptUrl = process.env.GMAIL_APPS_SCRIPT_URL
    const appsScriptSecret = process.env.GMAIL_APPS_SCRIPT_SECRET
    const adminEmail = process.env.ADMIN_EMAIL || 'savash12@hotmail.co.uk'
    const fromEmail = process.env.FROM_EMAIL || 'basaryldrm1237@gmail.com'

    if (appsScriptUrl) {
      try {
        // XSS koruması için HTML escape
        const escapeHtml = (text: string) => {
          const map: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
          }
          return text.replace(/[&<>"']/g, (m) => map[m])
        }

        // Değerleri önce escape et
        const safeFirstName = escapeHtml(firstName)
        const safeLastName = escapeHtml(lastName)
        const safeEmail = escapeHtml(email)
        const safePhone = phone ? escapeHtml(phone) : 'Not provided'
        const safeVisaType = escapeHtml(visaType)
        const safeSubject = escapeHtml(subject)
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
        const safePreferredContact = escapeHtml(preferredContact)
        const safeUrgency = escapeHtml(urgency)

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #667eea; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
                .message-box { padding: 15px; background: white; border-left: 4px solid #667eea; margin-top: 10px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Full Name:</div>
                    <div class="value">${safeFirstName} ${safeLastName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">${safePhone}</div>
                  </div>
                  <div class="field">
                    <div class="label">Visa Type:</div>
                    <div class="value">${safeVisaType}</div>
                  </div>
                  <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">${safeSubject}</div>
                  </div>
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="message-box">${safeMessage}</div>
                  </div>
                  <div class="field">
                    <div class="label">Preferred Contact Method:</div>
                    <div class="value">${safePreferredContact}</div>
                  </div>
                  <div class="field">
                    <div class="label">Urgency Level:</div>
                    <div class="value">${safeUrgency}</div>
                  </div>
                  <div class="footer">
                    <p><strong>Submission Date:</strong> ${new Date().toLocaleString('en-US')}</p>
                    <p><strong>Submission ID:</strong> ${contactSubmission.id}</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `
        const response = await fetch(appsScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: adminEmail,
            from: fromEmail,
            subject: `New Contact Form Submission - ${safeSubject}`,
            html: emailHtml,
            ...(appsScriptSecret && { secret: appsScriptSecret }),
          }),
        })
        const responseText = await response.text()

        let result
        try {
          result = JSON.parse(responseText)
        } catch (parseError) {
         
          throw new Error(`Apps Script returned non-JSON response (Status: ${response.status}). Check deployment settings.`)
        }

        if (result.success) {
        } 
      } catch (error) {
        console.error('Email sending error:', error)
      }
    } 

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form başarıyla gönderildi',
        id: contactSubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { 
        error: 'Sunucu hatası',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
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

  } catch (_error) {
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

  } catch (_error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
