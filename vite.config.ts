import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && 
      visualizer({
        filename: "dist/stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist", // <- Important for Vercel
    emptyOutDir: true,
    sourcemap: mode === "development", // Optional: keep sourcemaps in dev
    cssCodeSplit: true,
    reportCompressedSize: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
        passes: 2,  // Multiple passes for better minification
      },
      output: {
        comments: false, // Remove comments
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            if (id.includes('@radix-ui') || id.includes('shadcn') || id.includes('cmdk')) {
              return 'vendor-ui';
            }
            return 'vendor-other';
          }
          
          if (id.includes('/pages/')) {
            if (id.includes('/team-detail/')) {
              return 'page-team-detail';
            }
            if (id.includes('/home/')) {
              return 'page-home';
            }
            return 'page-other';
          }
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [],
    esbuildOptions: {
      target: 'es2020',
      treeShaking: true,
      jsx: 'automatic',
      minify: true,
    }
  },
}));
