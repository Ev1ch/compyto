import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [nodePolyfills(), tsconfigPaths(), react()],
  build: {
    outDir: 'dist/client',
  },
});
