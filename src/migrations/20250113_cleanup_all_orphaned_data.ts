import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Bu migration artık gerekli değil çünkü veritabanı tamamen sıfırlandı
  // Tüm veriler temiz olacak
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Bu migration geri alınamaz çünkü veri silme işlemi yapıyoruz
  // Geri alma işlemi için özel bir şey yapmaya gerek yok
}
