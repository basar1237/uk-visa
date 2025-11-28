#!/usr/bin/env node

/**
 * Deployment Kontrol Script'i
 * Bu script production deployment'ınızın doğru çalışıp çalışmadığını kontrol eder
 * 
 * Kullanım:
 * node scripts/check-deployment.js https://your-domain.vercel.app
 */

const url = process.argv[2]

if (!url) {
  console.error('❌ Hata: URL belirtmelisiniz!')
  console.log('\n📝 Kullanım:')
  console.log('  node scripts/check-deployment.js https://your-domain.vercel.app\n')
  process.exit(1)
}

console.log('🔍 Deployment Kontrolü Başlıyor...\n')
console.log(`📍 URL: ${url}\n`)

async function checkEndpoint(endpoint, description) {
  const fullUrl = `${url}${endpoint}`
  console.log(`Kontrol ediliyor: ${description}`)
  console.log(`  URL: ${fullUrl}`)
  
  try {
    const response = await fetch(fullUrl)
    const status = response.status
    
    if (status === 200) {
      console.log(`  ✅ Başarılı (${status})`)
      return true
    } else if (status === 404) {
      console.log(`  ⚠️  Bulunamadı (${status})`)
      return false
    } else if (status >= 500) {
      console.log(`  ❌ Server Hatası (${status})`)
      return false
    } else {
      console.log(`  ⚠️  Beklenmeyen yanıt (${status})`)
      return false
    }
  } catch (error) {
    console.log(`  ❌ Bağlantı Hatası: ${error.message}`)
    return false
  }
}

async function runChecks() {
  const checks = []
  
  // 1. Ana sayfa
  console.log('\n1️⃣  Ana Sayfa Kontrolü')
  console.log('─────────────────────────')
  checks.push(await checkEndpoint('/', 'Ana sayfa'))
  
  // 2. Admin panel
  console.log('\n2️⃣  Admin Panel Kontrolü')
  console.log('─────────────────────────')
  checks.push(await checkEndpoint('/admin', 'Admin login sayfası'))
  
  // 3. API endpoints
  console.log('\n3️⃣  API Kontrolü')
  console.log('─────────────────────────')
  checks.push(await checkEndpoint('/api/contact-submissions', 'Contact Submissions API'))
  checks.push(await checkEndpoint('/api/eligibility-submissions', 'Eligibility Submissions API'))
  checks.push(await checkEndpoint('/api/graphql', 'GraphQL API'))
  
  // 4. Static assets
  console.log('\n4️⃣  Static Assets Kontrolü')
  console.log('─────────────────────────')
  checks.push(await checkEndpoint('/favicon.ico', 'Favicon'))
  
  // Sonuçlar
  console.log('\n' + '═'.repeat(50))
  console.log('📊 SONUÇLAR')
  console.log('═'.repeat(50))
  
  const successful = checks.filter(c => c).length
  const total = checks.length
  
  console.log(`\n✅ Başarılı: ${successful}/${total}`)
  console.log(`❌ Başarısız: ${total - successful}/${total}\n`)
  
  if (successful === total) {
    console.log('🎉 Tüm kontroller başarılı! Deployment çalışıyor görünüyor.\n')
    console.log('ℹ️  Admin panel için tarayıcıdan şu adresi ziyaret edin:')
    console.log(`   ${url}/admin\n`)
  } else {
    console.log('⚠️  Bazı kontroller başarısız oldu.\n')
    console.log('🔧 Yapılacaklar:')
    console.log('   1. Vercel dashboard\'da Environment Variables kontrol edin')
    console.log('   2. Build logs\'da hata olup olmadığını kontrol edin')
    console.log('   3. Vercel Functions logs\'u kontrol edin')
    console.log('   4. Browser console\'da (F12) hata kontrol edin\n')
    console.log('📖 Detaylı bilgi için: VERCEL_DEPLOYMENT.md dosyasına bakın\n')
  }
  
  // Admin panel özel kontrol
  console.log('💡 Admin Panel Özel Kontrolleri:')
  console.log('─────────────────────────────────')
  console.log('   • Tarayıcınızda F12 ile Developer Console açın')
  console.log('   • /admin sayfasına gidin')
  console.log('   • Console\'da kırmızı hata mesajları var mı kontrol edin')
  console.log('   • Network tab\'de failed requests var mı kontrol edin\n')
}

runChecks().catch(error => {
  console.error('\n❌ Script hatası:', error.message)
  process.exit(1)
})

