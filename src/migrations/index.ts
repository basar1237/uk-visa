import * as migration_20251011_231344 from './20251011_231344';
import * as migration_20251012_190541_faq_block_inline_only from './20251012_190541_faq_block_inline_only';
import * as migration_20250113_cleanup_orphaned_services_grid from './20250113_cleanup_orphaned_services_grid';
import * as migration_20250113_cleanup_orphaned_long_grids from './20250113_cleanup_orphaned_long_grids';
import * as migration_20250113_cleanup_all_orphaned_data from './20250113_cleanup_all_orphaned_data';

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
  {
    up: migration_20250113_cleanup_orphaned_services_grid.up,
    down: migration_20250113_cleanup_orphaned_services_grid.down,
    name: '20250113_cleanup_orphaned_services_grid'
  },
  {
    up: migration_20250113_cleanup_orphaned_long_grids.up,
    down: migration_20250113_cleanup_orphaned_long_grids.down,
    name: '20250113_cleanup_orphaned_long_grids'
  },
  {
    up: migration_20250113_cleanup_all_orphaned_data.up,
    down: migration_20250113_cleanup_all_orphaned_data.down,
    name: '20250113_cleanup_all_orphaned_data'
  },
];
