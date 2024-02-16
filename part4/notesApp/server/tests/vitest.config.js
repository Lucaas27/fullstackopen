/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    include: ['**/*.test.{js,mjs,cjs,ts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    watchExclude: ['**/node_modules/**', '**/dist/**'],
    globals: true,
    globalSetup: [resolve(__dirname, './helpers/db/globalSetup.js')],
    setupFiles: [resolve(__dirname, './helpers/db/setupFile.js')],
    // reporters: ['json'],
    // outputFile: './tests/results/',
    coverage: {
      enabled: true,
      all: false,
      provider: 'istanbul', // or 'v8'
      exclude: ['helpers/db/**', 'helpers/testing.js'],
      // reporter: ['lcov'],
      // reportsDirectory: 'coverage/',
    },
    testTimeout: 5000,
  },
});
