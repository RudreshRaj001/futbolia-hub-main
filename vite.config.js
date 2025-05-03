import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react({
        // Use SWC's minification in production for better performance
        minify: isProduction,
        jsxImportSource: '@emotion/react',
      }),
      
      // Split vendor chunks for better caching
      splitVendorChunkPlugin(),
      
      // Enable Progressive Web App in production
      isProduction && VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'logo1.png', 'robots.txt'],
        manifest: {
          name: 'Futbolia',
          short_name: 'Futbolia',
          description: 'Sitio del fútbol ecuatoriano',
          theme_color: '#4361ee',
          icons: [
            {
              src: '/favicon.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/logo1.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          // Cache assets for offline use
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
          // Don't precache all images - just critical ones
          globIgnores: ['**/lovable-uploads/**'],
          // Cache page navigations
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.futbolia\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24, // 24 hours
                },
              },
            },
          ],
        },
      }),
      
      // Enable Brotli & Gzip compression in production
      isProduction && compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpe?g|webp|gif|svg)$/i],
      }),
      
      isProduction && compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpe?g|webp|gif|svg)$/i],
      }),
      
      // Generate bundle size visualization in production
      isProduction && visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'stats.html',
      }),
    ].filter(Boolean),
    
    // Resolve path aliases
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    // Optimize build for production
    build: {
      // Generate sourcemaps in development only
      sourcemap: !isProduction,
      // Split chunks for better caching
      rollupOptions: {
        output: {
          // Use function form of manualChunks for compatibility with splitVendorChunkPlugin
          manualChunks: (id) => {
            // React and related packages
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom') || 
                id.includes('node_modules/react-router-dom')) {
              return 'react-vendor';
            }
            
            // UI libraries
            if (id.includes('node_modules/@radix-ui') || 
                id.includes('node_modules/framer-motion') || 
                id.includes('node_modules/react-day-picker')) {
              return 'ui-vendor';
            }
            
            // State management
            if (id.includes('node_modules/@tanstack/react-query') || 
                id.includes('node_modules/@reduxjs/toolkit') || 
                id.includes('node_modules/react-redux')) {
              return 'state-vendor';
            }
            
            // Let the default algorithm handle the rest
            return null;
          },
          // Prevent chunk filenames from including hash for better caching
          chunkFileNames: isProduction 
            ? 'assets/[name]-[hash].js' 
            : 'assets/[name].js',
          // Optimize asset filenames
          assetFileNames: (assetInfo) => {
            // Place CSS files in a dedicated directory with proper patterns for caching
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name]-[hash][extname]';
            }
            // Place images in an images directory
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            // Return default naming for any other asset
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      // Target modern browsers for smaller bundle sizes
      target: 'es2020',
      // Split CSS for better caching and reduce CSS-in-JS
      cssCodeSplit: true,
      // Minify CSS
      cssMinify: isProduction,
      // Reduce chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
    
    // Optimize server for development
    server: {
      // Enable compression in dev server
      compress: true,
      // Optimize for faster dev reloading
      hmr: {
        overlay: true,
      },
    },
    
    // Define globals for better tree-shaking
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'import.meta.env.API_URL': JSON.stringify(
        isProduction 
          ? 'https://api.futbolia.com' 
          : 'http://localhost:3000'
      ),
    },
  };
}); 