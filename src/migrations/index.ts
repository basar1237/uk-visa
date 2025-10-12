import * as migration_20251011_231344 from './20251011_231344';
import * as migration_20251012_190541_faq_block_inline_only from './20251012_190541_faq_block_inline_only';

export const migrations = [
  {
    up: migration_20251011_231344.up,
    down: migration_20251011_231344.down,
    name: '20251011_231344',
  },
  {
    up: migration_20251012_190541_faq_block_inline_only.up,
    down: migration_20251012_190541_faq_block_inline_only.down,
    name: '20251012_190541_faq_block_inline_only'
  },
];
