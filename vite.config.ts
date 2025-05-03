import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
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
    chunkSizeWarningLimit: 1000, // Increase the warning limit
    reportCompressedSize: true,
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: mode !== "development", // Remove console in production
        drop_debugger: mode !== "development",
        pure_funcs: mode !== "development" ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 2, // Multiple minification passes for better compression
      },
      format: {
        comments: false, // Remove comments
      },
      mangle: {
        properties: {
          regex: /^_/ // Mangle properties that start with underscore
        }
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Bundle core frameworks separately
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }

          // Bundle UI libraries
          if (id.includes('node_modules/@radix-ui') || 
              id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge')) {
            return 'ui-vendor';
          }

          // Bundle animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'animation';
          }

          // Bundle state management
          if (id.includes('node_modules/@reduxjs') || 
              id.includes('node_modules/react-redux')) {
            return 'state-management';
          }

          // Bundle data fetching
          if (id.includes('node_modules/@tanstack/react-query') || 
              id.includes('node_modules/axios')) {
            return 'data-fetching';
          }

          // Bundle utilities
          if (id.includes('node_modules/date-fns') || 
              id.includes('node_modules/dayjs') ||
              id.includes('node_modules/zod')) {
            return 'utilities';
          }
          
          // Keep the rest as is
          return undefined;
        },
        // Adjust chunk naming and CSS handling
        chunkFileNames: mode !== "development" ? 'assets/[name].[hash].js' : 'assets/[name].js',
        entryFileNames: mode !== "development" ? 'assets/[name].[hash].js' : 'assets/[name].js',
        assetFileNames: mode !== "development" ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]',
      },
    },
    // Enable tree-shaking and more aggressive dead code elimination
    target: 'es2018',
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb - inline small assets
    cssMinify: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: []
  },
  // Improve CSS handling
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
    }
  },
}));
