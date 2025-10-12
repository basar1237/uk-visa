import * as migration_20251011_231344 from './20251011_231344';

export const migrations = [
  {
    up: migration_20251011_231344.up,
    down: migration_20251011_231344.down,
    name: '20251011_231344'
  },
];
