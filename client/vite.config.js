import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const { PuppeteerRenderer } = require('vite-plugin-prerender');
const VitePluginPrerender = require('vite-plugin-prerender');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePluginPrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about', '/services', '/work', '/contact'],
      renderer: new PuppeteerRenderer(),
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
