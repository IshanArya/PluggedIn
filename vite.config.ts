import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // build: {
  //   rollupOptions: {
  //     external: ['cloudflare:sockets'],
  //   },
  // },
  server: {
    host: '127.0.0.1',
  },
});
