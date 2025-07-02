import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './config/vitest.setup.ts',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    css: false,
    coverage: {
      exclude: [
        'node_modules',
        'app/**',
        '.next/**'
      ],
    },
    exclude: [
      'node_modules',
      '.next/**'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '<@>': path.resolve(__dirname, 'src'),
    },
  },
})