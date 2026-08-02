/**
 * Header menüsündeki "HR Business Immigration" linkini /hr-business yapar.
 * Sadece o tek nav öğesinin URL'i değişir; menünün kalanına dokunulmaz.
 *
 * Kullanım: pnpm tsx scripts/fix-hr-nav-link.ts --apply  (bayraksız: dry run)
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const APPLY = process.argv.includes('--apply')

async function main() {
  const payload = await getPayload({ config })
  const header = (await payload.findGlobal({ slug: 'header', depth: 0, overrideAccess: true })) as any

  const item = (header.navItems || []).find((n: any) =>
    (n.link?.label || '').toLowerCase().includes('hr business'),
  )
  if (!item) throw new Error('HR Business nav öğesi bulunamadı')

  console.log(`Bulunan: "${item.link.label}" -> ${item.link.url} (type=${item.link.type})`)
  console.log('Yeni hedef: /hr-business')

  if (!APPLY) {
    console.log('DRY RUN — değişiklik yazılmadı.')
    return
  }

  item.link.type = 'custom'
  item.link.url = '/hr-business'
  item.link.reference = null

  await payload.updateGlobal({
    slug: 'header',
    data: { navItems: header.navItems },
    depth: 0,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })
  console.log('Güncellendi.')
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
