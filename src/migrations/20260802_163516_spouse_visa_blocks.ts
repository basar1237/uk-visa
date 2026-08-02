import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Spouse Visa sayfası için yeni bloklar: processSteps, financialRequirements,
 * checklistCards + hero.badges alanı.
 *
 * NOT: Bu DB bugüne dek `push` ile yönetildiği için (payload_migrations'ta yalnız
 * "dev" kaydı var) buradaki SQL, orijinal auto-generate çıktısından SADECE yeni
 * nesnelere indirgendi ve idempotent yazıldı (IF NOT EXISTS / duplicate guard).
 * `payload migrate` ile DEĞİL, scripts/apply-spouse-blocks-schema.ts ile uygulanır.
 * Tamamen ekleme yapar; hiçbir mevcut tablo/kolon silinmez veya değiştirilmez.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_process_steps_style" AS ENUM('grid', 'compact', 'timeline');
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_process_steps_style" AS ENUM('grid', 'compact', 'timeline');
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  CREATE TABLE IF NOT EXISTS "pages_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"style" "enum_pages_blocks_process_steps_style" DEFAULT 'grid',
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_financial_requirements_situations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"result_title" varchar,
  	"result_text" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_financial_requirements_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_financial_requirements_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"button_text" varchar,
  	"button_link" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_financial_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"highlight_label" varchar,
  	"highlight_value" varchar,
  	"highlight_suffix" varchar,
  	"highlight_note" varchar,
  	"situations_title" varchar,
  	"categories_title" varchar,
  	"categories_description" varchar,
  	"bottom_cta_title" varchar,
  	"bottom_cta_description" varchar,
  	"bottom_cta_button_text" varchar,
  	"bottom_cta_button_link" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_checklist_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_checklist_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_checklist_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"style" "enum__pages_v_blocks_process_steps_style" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_financial_requirements_situations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"result_title" varchar,
  	"result_text" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_financial_requirements_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_financial_requirements_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_financial_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"highlight_label" varchar,
  	"highlight_value" varchar,
  	"highlight_suffix" varchar,
  	"highlight_note" varchar,
  	"situations_title" varchar,
  	"categories_title" varchar,
  	"categories_description" varchar,
  	"bottom_cta_title" varchar,
  	"bottom_cta_description" varchar,
  	"bottom_cta_button_text" varchar,
  	"bottom_cta_button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_checklist_cards_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_checklist_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_checklist_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  DO $$ BEGIN
    ALTER TABLE "pages_hero_badges" ADD CONSTRAINT "pages_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_financial_requirements_situations" ADD CONSTRAINT "pages_blocks_financial_requirements_situations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_financial_requirements"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_financial_requirements_categories_items" ADD CONSTRAINT "pages_blocks_financial_requirements_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_financial_requirements_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_financial_requirements_categories" ADD CONSTRAINT "pages_blocks_financial_requirements_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_financial_requirements"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_financial_requirements" ADD CONSTRAINT "pages_blocks_financial_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_checklist_cards_cards_items" ADD CONSTRAINT "pages_blocks_checklist_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checklist_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_checklist_cards_cards" ADD CONSTRAINT "pages_blocks_checklist_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checklist_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "pages_blocks_checklist_cards" ADD CONSTRAINT "pages_blocks_checklist_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_version_hero_badges" ADD CONSTRAINT "_pages_v_version_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_financial_requirements_situations" ADD CONSTRAINT "_pages_v_blocks_financial_requirements_situations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_financial_requirements"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_financial_requirements_categories_items" ADD CONSTRAINT "_pages_v_blocks_financial_requirements_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_financial_requirements_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_financial_requirements_categories" ADD CONSTRAINT "_pages_v_blocks_financial_requirements_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_financial_requirements"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_financial_requirements" ADD CONSTRAINT "_pages_v_blocks_financial_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_checklist_cards_cards_items" ADD CONSTRAINT "_pages_v_blocks_checklist_cards_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checklist_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_checklist_cards_cards" ADD CONSTRAINT "_pages_v_blocks_checklist_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checklist_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_checklist_cards" ADD CONSTRAINT "_pages_v_blocks_checklist_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  CREATE INDEX IF NOT EXISTS "pages_hero_badges_order_idx" ON "pages_hero_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_badges_parent_id_idx" ON "pages_hero_badges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_situations_order_idx" ON "pages_blocks_financial_requirements_situations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_situations_parent_id_idx" ON "pages_blocks_financial_requirements_situations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_categories_items_order_idx" ON "pages_blocks_financial_requirements_categories_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_categories_items_parent_id_idx" ON "pages_blocks_financial_requirements_categories_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_categories_order_idx" ON "pages_blocks_financial_requirements_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_categories_parent_id_idx" ON "pages_blocks_financial_requirements_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_order_idx" ON "pages_blocks_financial_requirements" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_parent_id_idx" ON "pages_blocks_financial_requirements" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_financial_requirements_path_idx" ON "pages_blocks_financial_requirements" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_cards_items_order_idx" ON "pages_blocks_checklist_cards_cards_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_cards_items_parent_id_idx" ON "pages_blocks_checklist_cards_cards_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_cards_order_idx" ON "pages_blocks_checklist_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_cards_parent_id_idx" ON "pages_blocks_checklist_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_order_idx" ON "pages_blocks_checklist_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_parent_id_idx" ON "pages_blocks_checklist_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_checklist_cards_path_idx" ON "pages_blocks_checklist_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_order_idx" ON "_pages_v_version_hero_badges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_badges_parent_id_idx" ON "_pages_v_version_hero_badges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_situations_order_idx" ON "_pages_v_blocks_financial_requirements_situations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_situations_parent_id_idx" ON "_pages_v_blocks_financial_requirements_situations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_categories_items_order_idx" ON "_pages_v_blocks_financial_requirements_categories_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_categories_items_parent_id_idx" ON "_pages_v_blocks_financial_requirements_categories_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_categories_order_idx" ON "_pages_v_blocks_financial_requirements_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_categories_parent_id_idx" ON "_pages_v_blocks_financial_requirements_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_order_idx" ON "_pages_v_blocks_financial_requirements" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_parent_id_idx" ON "_pages_v_blocks_financial_requirements" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_financial_requirements_path_idx" ON "_pages_v_blocks_financial_requirements" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_cards_items_order_idx" ON "_pages_v_blocks_checklist_cards_cards_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_cards_items_parent_id_idx" ON "_pages_v_blocks_checklist_cards_cards_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_cards_order_idx" ON "_pages_v_blocks_checklist_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_cards_parent_id_idx" ON "_pages_v_blocks_checklist_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_order_idx" ON "_pages_v_blocks_checklist_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_parent_id_idx" ON "_pages_v_blocks_checklist_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_checklist_cards_path_idx" ON "_pages_v_blocks_checklist_cards" USING btree ("_path");

  -- checklistCards.bottomCta grubu (sonradan eklendi — "Need guidance?" koyu CTA kartı)
  ALTER TABLE "pages_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_icon" varchar;
  ALTER TABLE "pages_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_title" varchar;
  ALTER TABLE "pages_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_description" varchar;
  ALTER TABLE "pages_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_button_text" varchar;
  ALTER TABLE "pages_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_button_link" varchar;
  ALTER TABLE "_pages_v_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_icon" varchar;
  ALTER TABLE "_pages_v_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_title" varchar;
  ALTER TABLE "_pages_v_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_description" varchar;
  ALTER TABLE "_pages_v_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_button_text" varchar;
  ALTER TABLE "_pages_v_blocks_checklist_cards" ADD COLUMN IF NOT EXISTS "bottom_cta_button_link" varchar;

  -- hero.eyebrow (sonradan eklendi — "UK SPOUSE VISA SUPPORT" etiketi)
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_eyebrow" varchar;

  -- featuresGrid.eyebrow/description/style (sonradan eklendi — "WHY CHOOSE US" banner görünümü)
  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_features_grid_style" AS ENUM('cards', 'banners');
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_features_grid_style" AS ENUM('cards', 'banners');
  EXCEPTION WHEN duplicate_object THEN null; END $$;
  ALTER TABLE "pages_blocks_features_grid" ADD COLUMN IF NOT EXISTS "eyebrow" varchar;
  ALTER TABLE "pages_blocks_features_grid" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "pages_blocks_features_grid" ADD COLUMN IF NOT EXISTS "style" "enum_pages_blocks_features_grid_style" DEFAULT 'cards';
  ALTER TABLE "_pages_v_blocks_features_grid" ADD COLUMN IF NOT EXISTS "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_features_grid" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "_pages_v_blocks_features_grid" ADD COLUMN IF NOT EXISTS "style" "enum__pages_v_blocks_features_grid_style" DEFAULT 'cards';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "_pages_v_blocks_checklist_cards_cards_items" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_checklist_cards_cards" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_checklist_cards" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_financial_requirements_categories_items" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_financial_requirements_categories" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_financial_requirements_situations" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_financial_requirements" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_version_hero_badges" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_checklist_cards_cards_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_checklist_cards_cards" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_checklist_cards" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_financial_requirements_categories_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_financial_requirements_categories" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_financial_requirements_situations" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_financial_requirements" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_process_steps" CASCADE;
  DROP TABLE IF EXISTS "pages_hero_badges" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_process_steps_style";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_process_steps_style";
  `)
}
