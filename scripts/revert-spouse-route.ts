/**
 * /spouse-route (id 58) sayfasını benim güncellememden ÖNCEKİ yayınlanmış
 * sürümüne geri döndürür. Silme yok — Payload restoreVersion kullanılır.
 *
 * Kullanım:
 *   pnpm tsx scripts/revert-spouse-route.ts           # dry run: sürümleri listeler
 *   pnpm tsx scripts/revert-spouse-route.ts --apply   # geri yükler
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const APPLY = process.argv.includes('--apply')
const PAGE_ID = 58

async function main() {
  const payload = await getPayload({ config })

  const versions = await payload.findVersions({
    collection: 'pages',
    where: { parent: { equals: PAGE_ID } },
    sort: '-createdAt',
    limit: 10,
    depth: 0,
    overrideAccess: true,
  })

  console.log('--- Son 10 sürüm (yeni -> eski) ---')
  for (const v of versions.docs) {
    console.log(
      `${v.id}\t${v.createdAt}\ttitle="${(v as any).version?.title}"\t_status=${(v as any).version?._status}\tblocks=[${((v as any).version?.layout || []).map((b: any) => b.blockType).join(',')}]`,
    )
  }

  // Benim değişikliğimden önceki sürüm: title "Spouse Route" olan en yeni yayınlanmış sürüm
  const target = versions.docs.find(
    (v: any) => v.version?.title === 'Spouse Route' && v.version?._status === 'published',
  )

  if (!target) {
    throw new Error('Eski "Spouse Route" sürümü bulunamadı — elle kontrol gerekli.')
  }

  console.log(`\nGeri yüklenecek sürüm: ${target.id} (${target.createdAt})`)

  if (!APPLY) {
    console.log('DRY RUN — geri yükleme yapılmadı. --apply ile çalıştırın.')
    return
  }

  const restored = await payload.restoreVersion({
    collection: 'pages',
    id: target.id,
    overrideAccess: true,
  })

  console.log(
    `Geri yüklendi: /${(restored as any).slug} title="${(restored as any).title}" _status=${(restored as any)._status}`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
