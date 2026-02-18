import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/commands/init.ts',
    'src/commands/add.ts',
    'src/commands/theme.ts',
    'src/commands/list.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  external: ['@stylexjs/stylex'],
});
