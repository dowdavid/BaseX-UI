import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/button/index.ts', 'src/accordion/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@stylexjs/stylex'],
});
