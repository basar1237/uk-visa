import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Önce _pages_v_blocks_services_grid tablosundaki geçersiz _parent_id kayıtlarını silelim
  await db.execute(sql`
    DELETE FROM "_pages_v_blocks_services_grid" 
    WHERE "_parent_id" NOT IN (
      SELECT "id" FROM "_pages_v"
    );
  `);

  // Aynı şekilde _pages_v_blocks_services_grid_services tablosundaki geçersiz kayıtları da silelim
  await db.execute(sql`
    DELETE FROM "_pages_v_blocks_services_grid_services" 
    WHERE "_parent_id" NOT IN (
      SELECT "id" FROM "_pages_v_blocks_services_grid"
    );
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Bu migration geri alınamaz çünkü veri silme işlemi yapıyoruz
  // Geri alma işlemi için özel bir şey yapmaya gerek yok
}
