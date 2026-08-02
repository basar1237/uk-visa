/**
 * READ-ONLY: Header menüsündeki tüm linkleri ve spouse/partner/family ile ilgili
 * sayfaları listeler.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

function linkUrl(link: any): string {
  if (!link) return '-'
  if (link.type === 'reference' && link.reference?.value) {
    const v = link.reference.value
    return typeof v === 'object' ? `/${v.slug}` : `(id:${v})`
  }
  return link.url || '-'
}

async function main() {
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({ slug: 'header', depth: 2, overrideAccess: true })

  console.log('--- HEADER MENÜ ---')
  for (const item of (header as any).navItems || []) {
    console.log(`${item.link?.label}  ->  ${linkUrl(item.link)}`)
    for (const dd of item.dropdownItems || []) {
      console.log(`  [dropdown] ${dd.title || dd.titleLink?.label}  ->  ${linkUrl(dd.titleLink)}`)
      for (const sub of dd.items || []) {
        console.log(`    - ${sub.link?.label}  ->  ${linkUrl(sub.link)}`)
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
