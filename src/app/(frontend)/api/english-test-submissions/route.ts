import { NextRequest, NextResponse } from 'next/server'
import { getPayloadInstance } from '@/utilities/getPayloadInstance'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadInstance()
    const body = await request.json()

    console.log('Received English test submission data:', body)

    // Form verilerini doğrula
    const {
      fullName,
      email,
      phone,
      score,
      totalQuestions,
      percentage,
      level,
      description,
      visaEligibility,
      recommendations,
      correctAnswers,
      wrongAnswers,
      testDuration,
      questionDetails
    } = body

    // Gerekli alanları kontrol et
    if (!fullName || !email || !score || !level) {
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

    // English test submission'ı oluştur
    const englishTestSubmission = await payload.create({
      collection: 'english-test-submissions',
      data: {
        fullName,
        email,
        phone: phone || '',
        score,
        totalQuestions: totalQuestions || 20,
        percentage,
        level,
        description: description || '',
        visaEligibility: visaEligibility || '',
        recommendations: recommendations || [],
        correctAnswers,
        wrongAnswers,
        testDuration: testDuration || 5,
        questionDetails: questionDetails || [],
        status: 'new',
      },
    })

    // Email bildirimi gönder (admin'e) - Şimdilik console.log ile test
    console.log('=== YENİ ENGLISH TEST GÖNDERİMİ ===')
    console.log('Ad Soyad:', fullName)
    console.log('Email:', email)
    console.log('Telefon:', phone || 'Belirtilmemiş')
    console.log('Skor:', score, '/', totalQuestions)
    console.log('Yüzde:', percentage + '%')
    console.log('Seviye:', level)
    console.log('Visa Uygunluğu:', visaEligibility)
    console.log('Gönderim Tarihi:', new Date().toLocaleString('tr-TR'))
    console.log('=====================================')

    return NextResponse.json(
      { 
        success: true,
        message: 'English test sonucu başarıyla gönderildi',
        id: englishTestSubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('English test submission error:', error)
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
        collection: 'english-test-submissions',
        id: parseInt(id),
      })
      submissions = [submission]
    } else {
      // Tüm submission'ları getir
      const result = await payload.find({
        collection: 'english-test-submissions',
        limit: 1000,
        sort: '-createdAt',
      })
      submissions = result.docs
    }

    if (format === 'csv') {
      // CSV formatında export
      const headers = [
        'ID',
        'Full Name',
        'Email',
        'Phone',
        'Score',
        'Total Questions',
        'Percentage',
        'Level',
        'Visa Eligibility',
        'Correct Answers',
        'Wrong Answers',
        'Test Duration',
        'Status',
        'Created At'
      ]

      const csvRows = [headers.join(',')]

      submissions.forEach(submission => {
        const row = [
          submission.id,
          `"${submission.fullName}"`,
          `"${submission.email}"`,
          `"${submission.phone || ''}"`,
          submission.score,
          submission.totalQuestions,
          submission.percentage,
          `"${submission.level}"`,
          `"${submission.visaEligibility || ''}"`,
          submission.correctAnswers,
          submission.wrongAnswers,
          submission.testDuration || 5,
          submission.status,
          new Date(submission.createdAt).toLocaleString('tr-TR')
        ]
        csvRows.push(row.join(','))
      })

      const csvContent = csvRows.join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="english-test-submissions-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // JSON formatında döndür
    return NextResponse.json(submissions)

  } catch (error) {
    console.error('English test submissions fetch error:', error)
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
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID gerekli' },
        { status: 400 }
      )
    }

    await payload.delete({
      collection: 'english-test-submissions',
      id: parseInt(id),
    })

    return NextResponse.json(
      { success: true, message: 'English test submission silindi' },
      { status: 200 }
    )

  } catch (error) {
    console.error('English test submission delete error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
