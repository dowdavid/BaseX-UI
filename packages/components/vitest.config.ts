import { defineConfig } from 'vitest/config';

// Per-package config: run component tests in jsdom so RTL and axe-core work.
// Root vitest.config.ts handles discovery; this sets the environment.
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
});
