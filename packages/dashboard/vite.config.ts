import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [nodePolyfills(), tsconfigPaths(), react(), compression()],
  build: {
    outDir: 'dist/client',
  },
});
