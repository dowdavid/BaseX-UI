import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    presets: 'src/presets.ts',
    oklch: 'src/oklch.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['@stylexjs/stylex'],
});
