import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Critical for React Router
  server: {
    host: true,
    port: 5173,
    strictPort: true, // Prevents automatic port switching
    open: false, // Disable automatic browser opening
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Optional: Create vendor chunks for better caching
          react: ['react', 'react-dom', 'react-router-dom'],
          helmet: ['react-helmet'],
        },
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
  // Add this for better error handling in production
  esbuild: {
    drop: ['console', 'debugger'], // Remove in production
  },
  // Ensure environment variables are available
  define: {
    'import.meta.env.BASE_URL': JSON.stringify(process.env.BASE_URL || '/'),
  }
});