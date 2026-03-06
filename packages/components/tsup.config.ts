import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/button/index.ts',
    'src/accordion/index.ts',
    'src/alert-dialog/index.ts',
    'src/autocomplete/index.ts',
    'src/avatar/index.ts',
    'src/checkbox/index.ts',
    'src/checkbox-group/index.ts',
    'src/collapsible/index.ts',
    'src/combobox/index.ts',
    'src/dialog/index.ts',
    'src/drawer/index.ts',
    'src/field/index.ts',
    'src/fieldset/index.ts',
    'src/form/index.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@stylexjs/stylex'],
});
