import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()]

  // Add bundle analyzer in analyze mode
  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        filename: 'bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap' // or 'sunburst', 'network'
      })
    )
  }

  return {
    plugins,
    
    // Define global constants
    define: {
      global: 'globalThis',
    },
    build: {
      // Enable source maps for better debugging
      sourcemap: mode === 'analyze',
      
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
            utils: ['axios', 'date-fns', 'formik', 'yup'],
            charts: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
            
            // Feature chunks
            auth: [
              './src/Components/auth/Sign-in',
              './src/Components/auth/RegisterForm'
            ],
            events: [
              './src/Components/Events/CreateEvent',
              './src/Components/Events/EventDetails',
              './src/Components/Events/MyEvents',
              './src/Components/Events/UpdateEvent'
            ],
            general: [
              './src/Components/General/AllTasks',
              './src/Components/General/Settings'
            ]
          },
          
          // Optimize chunk file names
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
            if (facadeModuleId) {
              const fileName = facadeModuleId.split('/').pop().replace('.jsx', '').replace('.js', '')
              return `js/${fileName}-[hash].js`
            }
            return 'js/[name]-[hash].js'
          },
          
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').pop()
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash].${extType}`
            }
            if (/css/i.test(extType)) {
              return `css/[name]-[hash].${extType}`
            }
            return `assets/[name]-[hash].${extType}`
          }
        }
      },
      
      // Optimize bundle size
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : []
        },
        mangle: {
          safari10: true
        }
      },
      
      // Set chunk size warning limit
      chunkSizeWarningLimit: 1000
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        'date-fns',
        'formik',
        'yup',
        '@mui/material',
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
        'hoist-non-react-statics'
      ],
      exclude: []
    },
    
    // Handle CommonJS modules
    commonjsOptions: {
      include: [/hoist-non-react-statics/, /node_modules/]
    },
    
    // Development server configuration
    server: {
      port: 5173,
      host: true,
      // Enable HMR for better development experience
      hmr: {
        overlay: true
      }
    },
    
    // Preview server configuration
    preview: {
      port: 4173,
      host: true
    },
    
    // Resolve aliases for cleaner imports
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@contexts': resolve(__dirname, 'src/contexts'),
        'hoist-non-react-statics': resolve(__dirname, 'node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js')
      }
    },
    
    // CSS configuration
    css: {
      devSourcemap: true
    }
  }
})