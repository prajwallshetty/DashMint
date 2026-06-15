import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@dashmint/core': path.resolve(__dirname, '../core/src/index.ts'),
      '@dashmint/charts': path.resolve(__dirname, '../charts/src/index.ts'),
      '@dashmint/themes': path.resolve(__dirname, '../themes/index.css'),
      '@dashmint/icons': path.resolve(__dirname, '../icons/src/index.ts'),
      '@dashmint/templates': path.resolve(__dirname, '../templates/src/index.ts')
    }
  }
});
