import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/app/**/*.page.tsx',
        'src/app/**/*.layout.tsx',
        'src/app/**/*.route.tsx',
        'src/app/**/*.loading.tsx',
        'src/app/**/*.error.tsx',
      ],
    },
  },
});