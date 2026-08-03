/** READ-ONLY: Footer global içeriğini ve son güncelleme zamanını gösterir. */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })
  const footer = (await payload.findGlobal({ slug: 'footer', depth: 1, overrideAccess: true })) as any
  console.log('updatedAt:', footer.updatedAt)
  console.log(JSON.stringify(footer.columns, null, 2))
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
