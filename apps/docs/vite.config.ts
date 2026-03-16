import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylexUnplugin from '@stylexjs/unplugin';
import path from 'node:path';

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    // StyleX must come before React plugin for HMR to work correctly
    stylexUnplugin.vite({
      useCSSLayers: true,
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: path.resolve(import.meta.dirname, '../..'),
        // Allow any file to be treated as a StyleX theme file, not just *.stylex.*
        // Required because workspace packages re-export defineVars from barrel files
        themeFileExtension: '',
      },
      // Ensure workspace packages get StyleX-compiled (excluded from Vite pre-bundling)
      externalPackages: ['@basex-ui/tokens', '@basex-ui/styles', '@basex-ui/components'],
    }),
    react(),
  ],
});
