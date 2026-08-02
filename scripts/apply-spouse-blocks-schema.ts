/**
 * Yeni blok tablolarını DB'ye ekler (yalnızca CREATE / ekleme — silme yok).
 * `payload migrate` KULLANILMAZ çünkü bu DB push ile yönetildi ve eski migration
 * dosyaları bu DB'de hiç çalışmadı; migrate hepsini sırayla çalıştırmaya kalkar.
 *
 * Kullanım: pnpm tsx scripts/apply-spouse-blocks-schema.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { up } from '../src/migrations/20260802_163516_spouse_visa_blocks'

async function main() {
  const payload = await getPayload({ config })
  const db = payload.db as any

  console.log('Yeni blok tabloları ekleniyor (idempotent, sadece CREATE)...')
  await up({ db: db.drizzle, payload, req: undefined as any })
  console.log('Tamamlandı.')

  // Doğrulama
  const res = await db.drizzle.execute(
    `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND (table_name LIKE '%process_steps%' OR table_name LIKE '%financial_requirements%' OR table_name LIKE '%checklist_cards%' OR table_name LIKE '%hero_badges%') ORDER BY table_name`,
  )
  console.log('\nOluşan tablolar:')
  console.log(res.rows.map((r: any) => r.table_name).join('\n'))
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
