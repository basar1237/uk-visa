import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."appear" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_landing_block_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_landing_block_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_faq_block_display_style" AS ENUM('accordion', 'list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_landing_block_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_landing_block_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_block_display_style" AS ENUM('accordion', 'list', 'grid');
  CREATE TABLE "pages_blocks_landing_block_columns_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_landing_block_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_landing_block_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "appear" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_landing_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_landing_block_columns_size" DEFAULT 'oneThird',
  	"title" varchar,
  	"rich_text" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_block_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sıkça Sorulan Sorular',
  	"description" varchar,
  	"display_style" "enum_pages_blocks_faq_block_display_style" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landing_block_columns_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landing_block_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_landing_block_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "appear" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landing_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_landing_block_columns_size" DEFAULT 'oneThird',
  	"title" varchar,
  	"rich_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sıkça Sorulan Sorular',
  	"description" varchar,
  	"display_style" "enum__pages_v_blocks_faq_block_display_style" DEFAULT 'accordion',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "bdgs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lnks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cols" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_bdgs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lnks_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cols_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "bdgs" CASCADE;
  DROP TABLE "lnks" CASCADE;
  DROP TABLE "cols" CASCADE;
  DROP TABLE "_bdgs_v" CASCADE;
  DROP TABLE "_lnks_v" CASCADE;
  DROP TABLE "_cols_v" CASCADE;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."appear" USING "link_appearance"::text::"public"."appear";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."appear" USING "link_appearance"::text::"public"."appear";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."appear" USING "link_appearance"::text::"public"."appear";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."appear" USING "link_appearance"::text::"public"."appear";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."appear" USING "link_appearance"::text::"public"."appear";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."appear" USING "link_appearance"::text::"public"."appear";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_landing_block_columns_badges" ADD CONSTRAINT "pages_blocks_landing_block_columns_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_block_columns_links" ADD CONSTRAINT "pages_blocks_landing_block_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_block_columns" ADD CONSTRAINT "pages_blocks_landing_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_faqs" ADD CONSTRAINT "pages_blocks_faq_block_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landing_block_columns_badges" ADD CONSTRAINT "_pages_v_blocks_landing_block_columns_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landing_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landing_block_columns_links" ADD CONSTRAINT "_pages_v_blocks_landing_block_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landing_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landing_block_columns" ADD CONSTRAINT "_pages_v_blocks_landing_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_block_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_landing_block_columns_badges_order_idx" ON "pages_blocks_landing_block_columns_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_block_columns_badges_parent_id_idx" ON "pages_blocks_landing_block_columns_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_block_columns_links_order_idx" ON "pages_blocks_landing_block_columns_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_block_columns_links_parent_id_idx" ON "pages_blocks_landing_block_columns_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_block_columns_order_idx" ON "pages_blocks_landing_block_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_block_columns_parent_id_idx" ON "pages_blocks_landing_block_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_faqs_order_idx" ON "pages_blocks_faq_block_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_faqs_parent_id_idx" ON "pages_blocks_faq_block_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_order_idx" ON "pages_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_parent_id_idx" ON "pages_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_path_idx" ON "pages_blocks_faq_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_landing_block_columns_badges_order_idx" ON "_pages_v_blocks_landing_block_columns_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landing_block_columns_badges_parent_id_idx" ON "_pages_v_blocks_landing_block_columns_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landing_block_columns_links_order_idx" ON "_pages_v_blocks_landing_block_columns_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landing_block_columns_links_parent_id_idx" ON "_pages_v_blocks_landing_block_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landing_block_columns_order_idx" ON "_pages_v_blocks_landing_block_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landing_block_columns_parent_id_idx" ON "_pages_v_blocks_landing_block_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_faqs_order_idx" ON "_pages_v_blocks_faq_block_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_faqs_parent_id_idx" ON "_pages_v_blocks_faq_block_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_order_idx" ON "_pages_v_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_parent_id_idx" ON "_pages_v_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_path_idx" ON "_pages_v_blocks_faq_block" USING btree ("_path");
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_lnks_link_type";
  DROP TYPE "public"."enum_lnks_link_appearance";
  DROP TYPE "public"."enum_cols_size";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__lnks_v_link_type";
  DROP TYPE "public"."enum__lnks_v_link_appearance";
  DROP TYPE "public"."enum__cols_v_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_lnks_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_lnks_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_cols_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__lnks_v_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__lnks_v_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__cols_v_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TABLE "bdgs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "lnks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_lnks_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_lnks_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_cols_size" DEFAULT 'oneThird',
  	"title" varchar,
  	"rich_text" jsonb
  );
  
  CREATE TABLE "_bdgs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lnks_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__lnks_v_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__lnks_v_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cols_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__cols_v_size" DEFAULT 'oneThird',
  	"title" varchar,
  	"rich_text" jsonb,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_landing_block_columns_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_landing_block_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_landing_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_landing_block_columns_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_landing_block_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_landing_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_landing_block_columns_badges" CASCADE;
  DROP TABLE "pages_blocks_landing_block_columns_links" CASCADE;
  DROP TABLE "pages_blocks_landing_block_columns" CASCADE;
  DROP TABLE "pages_blocks_faq_block_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_block" CASCADE;
  DROP TABLE "_pages_v_blocks_landing_block_columns_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_landing_block_columns_links" CASCADE;
  DROP TABLE "_pages_v_blocks_landing_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block" CASCADE;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_hero_links_link_appearance" USING "link_appearance"::text::"public"."enum_pages_hero_links_link_appearance";
  ALTER TABLE "pages_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_appearance" USING "link_appearance"::text::"public"."enum_pages_blocks_cta_links_link_appearance";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::text::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_links_link_appearance" USING "link_appearance"::text::"public"."enum__pages_v_version_hero_links_link_appearance";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" USING "link_appearance"::text::"public"."enum__pages_v_blocks_cta_links_link_appearance";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::text::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default';
  ALTER TABLE "bdgs" ADD CONSTRAINT "bdgs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lnks" ADD CONSTRAINT "lnks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cols" ADD CONSTRAINT "cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bdgs_v" ADD CONSTRAINT "_bdgs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cols_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lnks_v" ADD CONSTRAINT "_lnks_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_cols_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cols_v" ADD CONSTRAINT "_cols_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landing_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "bdgs_order_idx" ON "bdgs" USING btree ("_order");
  CREATE INDEX "bdgs_parent_id_idx" ON "bdgs" USING btree ("_parent_id");
  CREATE INDEX "lnks_order_idx" ON "lnks" USING btree ("_order");
  CREATE INDEX "lnks_parent_id_idx" ON "lnks" USING btree ("_parent_id");
  CREATE INDEX "cols_order_idx" ON "cols" USING btree ("_order");
  CREATE INDEX "cols_parent_id_idx" ON "cols" USING btree ("_parent_id");
  CREATE INDEX "_bdgs_v_order_idx" ON "_bdgs_v" USING btree ("_order");
  CREATE INDEX "_bdgs_v_parent_id_idx" ON "_bdgs_v" USING btree ("_parent_id");
  CREATE INDEX "_lnks_v_order_idx" ON "_lnks_v" USING btree ("_order");
  CREATE INDEX "_lnks_v_parent_id_idx" ON "_lnks_v" USING btree ("_parent_id");
  CREATE INDEX "_cols_v_order_idx" ON "_cols_v" USING btree ("_order");
  CREATE INDEX "_cols_v_parent_id_idx" ON "_cols_v" USING btree ("_parent_id");
  DROP TYPE "public"."appear";
  DROP TYPE "public"."enum_pages_blocks_landing_block_columns_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_landing_block_columns_size";
  DROP TYPE "public"."enum_pages_blocks_faq_block_display_style";
  DROP TYPE "public"."enum__pages_v_blocks_landing_block_columns_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_landing_block_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_faq_block_display_style";`)
}
