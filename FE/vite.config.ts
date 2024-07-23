import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'sw-cards-app.local',
      port: 443,
    },
    // https: {
    //   key: fs.readFileSync('../.cert/localhost.key'),
    //   cert: fs.readFileSync('../.cert/localhost.crt'),
    // },
  },
});
