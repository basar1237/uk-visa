import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    limit: 1000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    select: { slug: true, title: true, _status: true },
  })
  const drafts = result.docs.filter((d: any) => d._status !== 'published')
  const published = result.docs.filter((d: any) => d._status === 'published')
  console.log(`\nToplam: ${result.docs.length}`)
  console.log(`Yayında (published): ${published.length}`)
  console.log(`Taslak/yayında değil: ${drafts.length}\n`)
  if (drafts.length) {
    console.log('=== YAYINDA OLMAYAN SAYFALAR (canlıda 404 döner) ===')
    for (const d of drafts as any[]) {
      console.log(`  [id=${d.id}] /${d.slug}  "${d.title}"  (status: ${d._status})`)
    }
  }
  process.exit(0)
}
run().catch((e) => { console.error(e); process.exit(1) })
