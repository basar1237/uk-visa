import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/utilities/getPayloadInstance'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const body = await request.json()

    // Form verilerini doğrula (sonuç hesaplama alanları artık gönderilmiyor)
    const {
      fullName,
      dateOfBirth,
      nationality,
      gender,
      email,
      phone,
      visaType,
      applicationFor,
      visitPurpose,
      previousUKVisa,
      visaRefusal,
      criminalConvictions,
      sufficientFunds,
      familyInUK,
      familyRelationship,
      ukSponsor,
      additionalInfo,
      rawAnswers: _rawAnswers // Keep for potential future use
    } = body

    // Gerekli alanları kontrol et
    if (!fullName || !email || !nationality || !visaType) {
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

    // Date validation and defaults
    const today = new Date()
    const validDateOfBirth = dateOfBirth || new Date(today.getFullYear() - 30, 0, 1).toISOString().split('T')[0]

    const eligibilitySubmission = await payload.create({
      collection: 'eligibility-submissions',
      data: {
        fullName,
        dateOfBirth: validDateOfBirth,
        nationality,
        gender,
        email,
        phone: phone || 'Not provided',
        passportNumber: null, 
        passportExpiry: null, 
        passportIssuedBy: null, 
        visaType,
        applicationFor: applicationFor || 'myself',
        visitPurpose: visitPurpose || 'Other',
        previousUKVisa: previousUKVisa || 'no',
        visaRefusal: visaRefusal || 'no',
        criminalConvictions: criminalConvictions || 'no',
        sufficientFunds: sufficientFunds || 'no',
        familyInUK: familyInUK || 'no',
        familyRelationship: familyRelationship || '',
        ukSponsor: ukSponsor || 'no',
        additionalInfo: additionalInfo || '',
        eligible: false,
        score: 0,
        level: 'pending',
        description: '',
        recommendations: [],
        nextSteps: [],
        status: 'new',
      },
    })

    
    const appsScriptUrl = process.env.GMAIL_APPS_SCRIPT_URL
    const appsScriptSecret = process.env.GMAIL_APPS_SCRIPT_SECRET
    const adminEmail = process.env.ADMIN_EMAIL || 'info@ukimmigrationhelpline.com'
    const fromEmail = process.env.FROM_EMAIL || 'info@ukimmigrationhelpline.com'

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
        const safeFullName = escapeHtml(fullName)
        const safeEmail = escapeHtml(email)
        const safePhone = phone ? escapeHtml(phone) : 'Not provided'
        const safeNationality = escapeHtml(nationality)
        const safeGender = gender ? escapeHtml(gender) : 'Not provided'
        const safeDateOfBirth = validDateOfBirth ? new Date(validDateOfBirth).toLocaleDateString('en-US') : 'Not provided'
         const safeVisaType = escapeHtml(visaType)
        const safeApplicationFor = escapeHtml(applicationFor || 'myself')
        const safeVisitPurpose = escapeHtml(visitPurpose || 'Other')
        const safePreviousUKVisa = escapeHtml(previousUKVisa || 'no')
        const safeVisaRefusal = escapeHtml(visaRefusal || 'no')
        const safeCriminalConvictions = escapeHtml(criminalConvictions || 'no')
        const safeSufficientFunds = escapeHtml(sufficientFunds || 'no')
        const safeFamilyInUK = escapeHtml(familyInUK || 'no')
        const safeFamilyRelationship = familyRelationship ? escapeHtml(familyRelationship) : 'Not provided'
        const safeUkSponsor = escapeHtml(ukSponsor || 'no')
        let formattedAdditionalInfo = 'Not provided'
        if (additionalInfo) {
          if (typeof additionalInfo === 'string' && additionalInfo.includes(':')) {
            const qaPairs = additionalInfo.split('\n\n').filter(pair => pair.trim())
            formattedAdditionalInfo = qaPairs.map((pair, index) => {
              const [question, ...answerParts] = pair.split(':')
              const answer = answerParts.join(':').trim() || 'Not answered'
              const safeQuestion = escapeHtml(question.trim())
              const safeAnswer = escapeHtml(answer)
              return `
                <div class="qa-item" style="margin-bottom: ${index === qaPairs.length - 1 ? '0' : '15px'}; padding: 12px; background: ${index % 2 === 0 ? '#f9f9f9' : '#ffffff'}; border-left: 3px solid #667eea; border-radius: 4px;">
                  <div style="font-weight: bold; color: #667eea; margin-bottom: 5px;">${safeQuestion}</div>
                  <div style="color: #333; padding-left: 10px;">${safeAnswer}</div>
                </div>
              `
            }).join('')
          } else {
            try {
              const parsed = typeof additionalInfo === 'string' ? JSON.parse(additionalInfo) : additionalInfo
              if (typeof parsed === 'object' && parsed !== null) {
                formattedAdditionalInfo = Object.entries(parsed)
                  .map(([key, value], index, entries) => {
                    const safeValue = escapeHtml(String(value || 'Not answered'))
                    return `
                      <div class="qa-item" style="margin-bottom: ${index === entries.length - 1 ? '0' : '15px'}; padding: 12px; background: ${index % 2 === 0 ? '#f9f9f9' : '#ffffff'}; border-left: 3px solid #667eea; border-radius: 4px;">
                        <div style="font-weight: bold; color: #667eea; margin-bottom: 5px;">Question ID ${escapeHtml(key)}</div>
                        <div style="color: #333; padding-left: 10px;">${safeValue}</div>
                      </div>
                    `
                  }).join('')
              } else {
                formattedAdditionalInfo = escapeHtml(String(additionalInfo)).replace(/\n/g, '<br>')
              }
            } catch {
              formattedAdditionalInfo = escapeHtml(String(additionalInfo)).replace(/\n/g, '<br>')
            }
          }
        }
        const safeAdditionalInfo = formattedAdditionalInfo

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
                .section { margin-top: 20px; padding-top: 20px; border-top: 2px solid #667eea; }
                .section-title { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">New Eligibility Test Submission</h2>
                </div>
                <div class="content">
                  <div class="section">
                    <div class="section-title">Personal Information</div>
                    <div class="field">
                      <div class="label">Full Name:</div>
                      <div class="value">${safeFullName}</div>
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
                      <div class="label">Date of Birth:</div>
                      <div class="value">${safeDateOfBirth}</div>
                    </div>
                    <div class="field">
                      <div class="label">Nationality:</div>
                      <div class="value">${safeNationality}</div>
                    </div>
                    <div class="field">
                      <div class="label">Gender:</div>
                      <div class="value">${safeGender}</div>
                    </div>
                  </div>

                  <div class="section">
                    <div class="section-title">Visa Application Details</div>
                    <div class="field">
                      <div class="label">Visa Type:</div>
                      <div class="value">${safeVisaType}</div>
                    </div>
                    <div class="field">
                      <div class="label">Application For:</div>
                      <div class="value">${safeApplicationFor}</div>
                    </div>
                    <div class="field">
                      <div class="label">Visit Purpose:</div>
                      <div class="value">${safeVisitPurpose}</div>
                    </div>
                  </div>

                  <div class="section">
                    <div class="section-title">Background Information</div>
                    <div class="field">
                      <div class="label">Previous UK Visa:</div>
                      <div class="value">${safePreviousUKVisa}</div>
                    </div>
                    <div class="field">
                      <div class="label">Visa Refusal:</div>
                      <div class="value">${safeVisaRefusal}</div>
                    </div>
                    <div class="field">
                      <div class="label">Criminal Convictions:</div>
                      <div class="value">${safeCriminalConvictions}</div>
                    </div>
                    <div class="field">
                      <div class="label">Sufficient Funds:</div>
                      <div class="value">${safeSufficientFunds}</div>
                    </div>
                    <div class="field">
                      <div class="label">Family in UK:</div>
                      <div class="value">${safeFamilyInUK}</div>
                    </div>
                    ${safeFamilyRelationship !== 'Not provided' ? `
                    <div class="field">
                      <div class="label">Family Relationship:</div>
                      <div class="value">${safeFamilyRelationship}</div>
                    </div>
                    ` : ''}
                    <div class="field">
                      <div class="label">UK Sponsor:</div>
                      <div class="value">${safeUkSponsor}</div>
                    </div>
                  </div>

                  ${safeAdditionalInfo !== 'Not provided' ? `
                  <div class="section">
                    <div class="section-title">All Questions & Answers (${visaType})</div>
                    <div class="field">
                      <div class="qa-container" style="padding: 15px; background: white; border-radius: 4px;">
                        ${safeAdditionalInfo}
                      </div>
                    </div>
                  </div>
                  ` : ''}

                  <div class="footer">
                    <p><strong>Submission Date:</strong> ${new Date().toLocaleString('en-US')}</p>
                    <p><strong>Submission ID:</strong> ${eligibilitySubmission.id}</p>
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
            subject: `New Eligibility Test Submission - ${safeVisaType}`,
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
        message: 'Eligibility form başarıyla gönderildi',
        id: eligibilitySubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Eligibility form submission error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    const errorStack = error instanceof Error ? error.stack : undefined
    const errorName = error instanceof Error ? error.name : 'Unknown'
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      name: errorName
    })
    return NextResponse.json(
      { 
        error: 'Sunucu hatası',
        details: errorMessage,
        type: errorName
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

    // Eligibility submission'ı sil
    await payload.delete({
      collection: 'eligibility-submissions',
      id: id,
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Eligibility submission başarıyla silindi'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Eligibility submission delete error:', error)
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
    let eligibilitySubmissions
    if (id) {
      // Tek submission getir
      const submission = await payload.findByID({
        collection: 'eligibility-submissions',
        id: id,
      })
      eligibilitySubmissions = {
        docs: [submission],
        totalDocs: 1
      }
    } else {
      // Tüm eligibility submissions'ları getir
      eligibilitySubmissions = await payload.find({
        collection: 'eligibility-submissions',
        limit: 0, // Tüm kayıtları getir
        sort: '-createdAt', // En yeni önce
      })
    }

    if (format === 'csv') {
      // CSV formatında export
      const csvHeaders = [
        'ID',
        'Ad Soyad',
        'Doğum Tarihi',
        'Uyruk',
        'Cinsiyet',
        'Email',
        'Telefon',
        'Pasaport No',
        'Pasaport Bitiş',
        'Pasaport Veren',
        'Visa Tipi',
        'Başvuru Kimin İçin',
        'Ziyaret Amacı',
        'Önceki UK Visa',
        'Visa Reddi',
        'Suç Kaydı',
        'Yeterli Para',
        'UK\'de Aile',
        'Aile İlişkisi',
        'UK Sponsor',
        'Ek Bilgi',
        'Eligible',
        'Skor',
        'Seviye',
        'Açıklama',
        'Öneriler',
        'Sonraki Adımlar',
        'Durum',
        'Admin Notları',
        'Oluşturulma Tarihi',
        'Güncellenme Tarihi'
      ]

      const csvRows = eligibilitySubmissions.docs.map(submission => [
        submission.id,
        submission.fullName,
        submission.dateOfBirth,
        submission.nationality,
        submission.gender,
        submission.email,
        submission.phone || '',
        submission.passportNumber || '',
        submission.passportExpiry,
        submission.passportIssuedBy || '',
        submission.visaType,
        submission.applicationFor,
        submission.visitPurpose || '',
        submission.previousUKVisa,
        submission.visaRefusal,
        submission.criminalConvictions,
        submission.sufficientFunds,
        submission.familyInUK,
        submission.familyRelationship || '',
        submission.ukSponsor,
        submission.additionalInfo || '',
        submission.eligible ? 'Evet' : 'Hayır',
        submission.score,
        submission.level,
        submission.description?.replace(/\n/g, ' ').replace(/,/g, ';') || '',
        submission.recommendations?.map(r => r.recommendation).join('; ') || '',
        submission.nextSteps?.map(s => s.step).join('; ') || '',
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
          'Content-Disposition': `attachment; filename="eligibility-submissions-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // JSON formatında döndür
    return NextResponse.json({
      success: true,
      data: eligibilitySubmissions.docs,
      total: eligibilitySubmissions.totalDocs
    })

  } catch (error) {
    console.error('Eligibility submissions export error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}