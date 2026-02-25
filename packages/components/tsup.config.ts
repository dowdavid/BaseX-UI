import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/button/index.ts', 'src/accordion/index.ts', 'src/alert-dialog/index.ts', 'src/autocomplete/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@stylexjs/stylex'],
});
