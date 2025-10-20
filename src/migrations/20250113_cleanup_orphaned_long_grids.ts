import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // pages_blocks_long_grids_grid_items tablosundaki geçersiz _parent_id kayıtlarını silelim
  await db.execute(sql`
    DELETE FROM "pages_blocks_long_grids_grid_items" 
    WHERE "_parent_id" NOT IN (
      SELECT "id" FROM "pages_blocks_long_grids"
    );
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Bu migration geri alınamaz çünkü veri silme işlemi yapıyoruz
  // Geri alma işlemi için özel bir şey yapmaya gerek yok
}
