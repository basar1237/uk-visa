/**
 * SEO Audit & Filler
 *
 * - DRY RUN (default): Sadece oku, hiçbir şey yazma. Önerilen title/description'ları listele.
 * - APPLY mode: `--apply` flag'i ile çalışırsa SADECE boş veya generic alanları doldurur.
 *   MEVCUT ANLAMLI DEĞERLERİ ASLA EZMEZ. HİÇBİR KAYIT SİLMEZ.
 *
 * Kullanım:
 *   pnpm tsx scripts/seo-audit.ts              # dry run (hiçbir şey yazmaz)
 *   pnpm tsx scripts/seo-audit.ts --apply      # sadece boş/generic alanları doldurur
 *   pnpm tsx scripts/seo-audit.ts --collection=posts --apply
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const APPLY = process.argv.includes('--apply')
const COLLECTION_ARG = process.argv.find((a) => a.startsWith('--collection='))
const COLLECTION = (COLLECTION_ARG?.split('=')[1] || 'pages') as 'pages' | 'posts'

const BRAND = 'UK Immigration Helpline'

/**
 * Slug'ı insan-okunur başlığa çevirir: "skilled-worker-visa" -> "Skilled Worker Visa"
 */
function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_/]/)
    .map((w) => {
      const lower = w.toLowerCase()
      // Özel kısaltmalar
      if (lower === 'uk') return 'UK'
      if (lower === 'ilr' || lower === 'ilrr' || lower === 'ilrrr') return 'ILR'
      if (lower === 'faq') return 'FAQ'
      if (lower === 'eea') return 'EEA'
      if (lower === 'ukvi') return 'UKVI'
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })
    .join(' ')
}

/**
 * Title 'generic' mi? (doldurmaya değer)
 */
function isGenericTitle(title: string | undefined | null, slug?: string): boolean {
  if (!title) return true
  const normalized = title.trim().toLowerCase()
  if (normalized === '') return true
  const generics = ['home', 'homepage', 'untitled', 'new page', 'page']
  if (generics.includes(normalized)) return true
  // Slug ile birebir aynı ise de generic (CMS otomatik doldurmuş)
  if (slug && normalized === slug.toLowerCase()) return true
  if (slug && normalized === humanizeSlug(slug).toLowerCase()) return true
  // Yanlış marka suffix'i — "UK Solutions" doğru marka değil, düzeltilmeli
  if (normalized.includes('| uk solutions')) return true
  if (normalized.includes('uk solutions')) return true
  return false
}

/**
 * Slug'a göre SEO title üretir
 */
function generateTitle(slug: string, pageTitle?: string | null): string {
  if (slug === 'home' || slug === '' || slug === '/') {
    return `UK Visa & Immigration Services | Expert Immigration Lawyers`
  }
  if (slug === 'about' || slug === 'about-us') {
    return `About Us | ${BRAND}`
  }
  if (slug === 'contact' || slug === 'contact-us') {
    return `Contact Us | Free Immigration Consultation | ${BRAND}`
  }
  if (slug === 'posts' || slug === 'blog') {
    return `UK Immigration News & Updates | ${BRAND}`
  }
  if (slug === 'appointments' || slug === 'appointment') {
    return `Book Immigration Appointment | ${BRAND}`
  }
  if (slug === 'eligibility-check') {
    return `Free UK Visa Eligibility Check | ${BRAND}`
  }
  if (slug === 'comments' || slug === 'testimonials') {
    return `Client Reviews & Testimonials | ${BRAND}`
  }
  if (slug === 'search') {
    return `Search | ${BRAND}`
  }

  const humanized = pageTitle && !isGenericTitle(pageTitle, slug) ? pageTitle : humanizeSlug(slug)
  const lower = humanized.toLowerCase()

  // Servis tipine göre özel suffix
  if (/\bilr\b/i.test(humanized) || slug.includes('ilr')) {
    return `${humanized} UK | Indefinite Leave to Remain Application`
  }
  if (slug.endsWith('-first') || lower.includes('first application')) {
    const base = humanized.replace(/\s*First\s*$/i, '').trim()
    return `${base} UK | Visa Application & Expert Guidance`
  }
  if (lower.includes('visa')) {
    return `${humanized} UK | Application Support & Legal Advice`
  }
  if (lower.includes('appeal') || lower.includes('tribunal')) {
    return `${humanized} | UK Immigration Appeals Lawyer`
  }
  if (lower.includes('asylum')) {
    return `${humanized} | Expert Asylum & Protection Lawyers UK`
  }
  if (lower.includes('sponsor') && lower.includes('licence')) {
    return `${humanized} UK | Employer Sponsorship Support`
  }
  if (lower.includes('naturalisation') || lower.includes('citizenship')) {
    return `${humanized} | British Citizenship Application Help`
  }
  if (lower.includes('civil penalty')) {
    return `${humanized} UK | Challenge & Defence Support`
  }
  if (lower.includes('administrative review')) {
    return `${humanized} UK | Visa Refusal Challenge Support`
  }
  if (lower.includes('immigration bail')) {
    return `${humanized} UK | Detention Release Support`
  }

  // Generic fallback
  return `${humanized} | ${BRAND}`
}

/**
 * Slug'a göre SEO description üretir (150-160 karakter hedefi)
 */
function generateDescription(slug: string, pageTitle?: string | null): string {
  if (slug === 'home' || slug === '' || slug === '/') {
    return 'Expert UK immigration and visa services from regulated lawyers. Visa applications, appeals, settlement, citizenship and sponsor licences. Free initial consultation.'
  }
  if (slug === 'about' || slug === 'about-us') {
    return 'Meet UK Immigration Helpline — regulated immigration lawyers with years of experience in visa, settlement and appeal cases. Trusted legal support across the UK.'
  }
  if (slug === 'contact' || slug === 'contact-us') {
    return 'Contact UK Immigration Helpline for expert visa and immigration advice. Call, email or book a free initial consultation with a regulated immigration lawyer today.'
  }
  if (slug === 'appointments' || slug === 'appointment') {
    return 'Book an appointment with our UK immigration lawyers. Online or in-person consultations for visa applications, appeals, settlement and citizenship matters.'
  }
  if (slug === 'eligibility-check') {
    return 'Take our free UK visa eligibility check to find the right immigration route. Quick questionnaire reviewed by regulated immigration lawyers — no obligation.'
  }

  const humanized = pageTitle && !isGenericTitle(pageTitle, slug) ? pageTitle : humanizeSlug(slug)

  if (slug.includes('ilr')) {
    return `${humanized} application support in the UK. Regulated immigration lawyers help with documents, eligibility, interview prep and appeals. Book a free consultation.`
  }
  if (slug.endsWith('-first') || slug.includes('visa')) {
    return `${humanized} in the UK — expert help with applications, documents, eligibility and refusals. Regulated immigration lawyers. Free initial consultation available.`
  }
  if (slug.includes('appeal') || slug.includes('tribunal')) {
    return `${humanized} — expert UK immigration appeal lawyers. Grounds of appeal, bundles, hearings and representation. Free initial case assessment with regulated solicitors.`
  }
  if (slug.includes('asylum')) {
    return `${humanized} — experienced UK asylum and human rights lawyers. Screening, substantive interview, refusals and appeals. Confidential free initial consultation.`
  }
  if (slug.includes('sponsor')) {
    return `${humanized} — UK sponsor licence application, compliance, audits and suspensions. Guidance for employers from regulated immigration lawyers.`
  }
  if (slug.includes('naturalisation') || slug.includes('citizenship')) {
    return `${humanized} — British citizenship and naturalisation applications. Eligibility, good character, documents and ceremony guidance from regulated lawyers.`
  }
  if (slug.includes('civil-penalty')) {
    return `${humanized} — challenge UK civil penalty notices for illegal working. Objection, appeal and defence support from regulated immigration lawyers.`
  }
  if (slug.includes('administrative-review')) {
    return `${humanized} — UK visa refusal administrative review. Grounds, evidence and timelines. Expert help from regulated immigration lawyers. Free consultation.`
  }
  if (slug.includes('bail')) {
    return `${humanized} — UK immigration bail applications, sureties and conditions. Urgent detention release support from regulated immigration lawyers.`
  }

  // Generic fallback
  return `${humanized} in the UK — professional advice and application support from regulated immigration lawyers. Free initial consultation. Trusted legal guidance.`
}

/**
 * Title uzunluğunu kırp (60 karakter ideal, 65 max)
 */
function trimTitle(t: string, max = 65): string {
  if (t.length <= max) return t
  // Son boşluktan kırp
  const cut = t.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()
}

function trimDescription(d: string, max = 160): string {
  if (d.length <= max) return d
  const cut = d.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trim()
}

async function run() {
  console.log(`\n${'='.repeat(80)}`)
  console.log(`SEO AUDIT — collection: ${COLLECTION}, mode: ${APPLY ? '🔴 APPLY (will write)' : '🟢 DRY RUN (read-only)'}`)
  console.log('='.repeat(80))

  if (APPLY) {
    console.log('\n⚠️  APPLY mode açık. SADECE boş / generic alanlar doldurulacak.')
    console.log('⚠️  Mevcut anlamlı title/description ASLA ezilmeyecek.')
    console.log('⚠️  Hiçbir kayıt silinmeyecek.\n')
  }

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: COLLECTION,
    limit: 1000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  console.log(`\n${result.docs.length} ${COLLECTION} bulundu.\n`)

  let totalTitleEmpty = 0
  let totalDescEmpty = 0
  let totalWrites = 0
  let totalSkipped = 0

  for (const doc of result.docs as Array<Record<string, any>>) {
    const slug = (doc.slug as string) || ''
    const pageTitle = doc.title as string | undefined
    const currentMeta = (doc.meta || {}) as Record<string, any>
    const currentTitle = currentMeta.title as string | undefined
    const currentDesc = currentMeta.description as string | undefined

    const titleGeneric = isGenericTitle(currentTitle, slug)
    const descShort = !currentDesc || currentDesc.trim().length < 80

    const proposedTitle = trimTitle(generateTitle(slug, pageTitle))
    const proposedDesc = trimDescription(generateDescription(slug, pageTitle))

    const needsTitleFill = titleGeneric
    const needsDescFill = descShort

    if (!needsTitleFill && !needsDescFill) {
      console.log(`✅ /${slug}  (already has meaningful SEO, skipping)`)
      totalSkipped++
      continue
    }

    console.log(`\n─ /${slug} ${doc.id ? `[id=${doc.id}]` : ''}`)
    if (pageTitle) console.log(`   page.title: "${pageTitle}"`)

    if (needsTitleFill) {
      totalTitleEmpty++
      console.log(`   current meta.title:        ${currentTitle ? `"${currentTitle}"` : '(empty)'}`)
      console.log(`   PROPOSED meta.title:       "${proposedTitle}"  (${proposedTitle.length} chars)`)
    } else {
      console.log(`   meta.title kept:           "${currentTitle}"`)
    }

    if (needsDescFill) {
      totalDescEmpty++
      console.log(`   current meta.description:  ${currentDesc ? `"${currentDesc.slice(0, 60)}..."` : '(empty)'}`)
      console.log(`   PROPOSED meta.description: "${proposedDesc}"  (${proposedDesc.length} chars)`)
    } else {
      console.log(`   meta.description kept:     "${currentDesc?.slice(0, 60)}..."`)
    }

    if (APPLY) {
      // SADECE boş/generic olanları güncelle. Mevcut anlamlı değeri ASLA ezme.
      const nextMeta: Record<string, any> = { ...currentMeta }
      if (needsTitleFill) nextMeta.title = proposedTitle
      if (needsDescFill) nextMeta.description = proposedDesc

      try {
        await payload.update({
          collection: COLLECTION,
          id: doc.id,
          data: { meta: nextMeta } as any,
          overrideAccess: true,
        })
        console.log(`   ✏️  updated`)
        totalWrites++
      } catch (err) {
        console.error(`   ❌ update failed:`, err instanceof Error ? err.message : err)
      }
    }
  }

  console.log(`\n${'='.repeat(80)}`)
  console.log(`ÖZET`)
  console.log('='.repeat(80))
  console.log(`Toplam kayıt:                   ${result.docs.length}`)
  console.log(`Generic/boş title (fill edilecek): ${totalTitleEmpty}`)
  console.log(`Eksik description (fill edilecek): ${totalDescEmpty}`)
  console.log(`Dokunulmayan (zaten iyi):        ${totalSkipped}`)
  if (APPLY) {
    console.log(`Güncellenen kayıt:              ${totalWrites}`)
  } else {
    console.log(`\n🟢 DRY RUN — hiçbir şey yazılmadı.`)
    console.log(`   Devam etmek için: pnpm tsx scripts/seo-audit.ts --apply`)
  }
  console.log('='.repeat(80))

  // Payload instance'ı temiz kapat
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Script failed:', err)
  process.exit(1)
})
