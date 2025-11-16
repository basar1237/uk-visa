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
      passportNumber,
      passportExpiry,
      passportIssuedBy,
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
      additionalInfo
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
    const validPassportExpiry = passportExpiry || new Date(today.getFullYear() + 5, 11, 31).toISOString().split('T')[0]
    
    // Validate passportExpiry is a valid date
    if (!passportExpiry || passportExpiry.trim() === '') {
      return NextResponse.json(
        { error: 'Passport Expiry Date gerekli ve geçerli bir tarih olmalı' },
        { status: 400 }
      )
    }

    // Try to parse the date to ensure it's valid
    const passportExpiryDate = new Date(validPassportExpiry)
    if (isNaN(passportExpiryDate.getTime())) {
      return NextResponse.json(
        { error: 'Passport Expiry Date geçerli bir tarih formatı olmalı (YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    const eligibilitySubmission = await payload.create({
      collection: 'eligibility-submissions',
      data: {
        fullName,
        dateOfBirth: validDateOfBirth,
        nationality,
        gender,
        email,
        phone: phone || 'Not provided',
        passportNumber: passportNumber || 'Not provided',
        passportExpiry: validPassportExpiry,
        passportIssuedBy: passportIssuedBy || 'Not provided',
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
        // Sonuç hesaplama alanları artık gönderilmiyor, varsayılan değerler
        eligible: false,
        score: 0,
        level: 'pending',
        description: '',
        recommendations: [],
        nextSteps: [],
        status: 'new',
      },
    })


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
