/**
 * READ-ONLY: payload_migrations tablosunu ve mevcut tablo listesini gösterir.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })
  const db = (payload.db as any).drizzle

  try {
    const migrations = await db.execute(`SELECT id, name, batch FROM payload_migrations ORDER BY id`)
    console.log('--- payload_migrations ---')
    console.log(JSON.stringify(migrations.rows, null, 2))
  } catch (e: any) {
    console.log('payload_migrations okunamadı:', e.message)
  }

  const tables = await db.execute(
    `SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`,
  )
  console.log('\n--- public tablolar ---')
  console.log(tables.rows.map((r: any) => r.table_name).join('\n'))
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
