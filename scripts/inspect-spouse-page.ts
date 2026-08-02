/**
 * READ-ONLY: spouse ile ilgili sayfaları bulur ve blok yapısını listeler.
 * Hiçbir şey yazmaz/silmez.
 *
 * Kullanım: pnpm tsx scripts/inspect-spouse-page.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 200,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })

  console.log('--- TÜM SAYFALAR ---')
  for (const p of pages.docs) {
    const blocks = (p.layout || []).map((b: any) => b.blockType).join(',')
    console.log(`${p.id}\t/${p.slug}\t"${p.title}"\t_status=${p._status}\thero=${p.hero?.type}\tblocks=[${blocks}]`)
  }

  const spouse = pages.docs.filter(
    (p) =>
      (p.slug || '').includes('spouse') ||
      (p.slug || '').includes('partner') ||
      (p.title || '').toLowerCase().includes('spouse'),
  )

  console.log('\n--- SPOUSE İLE İLGİLİ SAYFALAR (detay) ---')
  for (const p of spouse) {
    console.log(JSON.stringify(p, null, 2))
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
