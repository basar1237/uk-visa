/** READ-ONLY: checklist_cards tablolarındaki bottom_cta kolonlarını listeler. */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })
  const r = await (payload.db as any).drizzle.execute(
    `SELECT table_name, column_name FROM information_schema.columns WHERE column_name LIKE 'bottom_cta%' AND table_name LIKE '%checklist%' ORDER BY table_name, column_name`,
  )
  console.log(r.rows.map((x: any) => `${x.table_name}.${x.column_name}`).join('\n') || 'YOK!')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
