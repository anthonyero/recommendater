import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' ? process.env.RENDER_EXTERNAL_URL : 'http://localhost:3001/', // When deployed/ in production, we will want to utilize Render's RENDER_EXTERNAL_URL environmental variable provided at runtime. 
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, // If we have are in production, secure is 'true', 'false' otherwise
        // When deployed, to access the resource we remove 'api' from the URI. localhost:3001/api/text becomes .onrender.com/text, which is why my fetch requests currently don't work deployed
        // Rationale below is that when deployed we would like to continue using path to maintain our current fetch request structure and endpoints/routes when developed
        // rewrite: (path) => process.env.NODE_ENV === 'production' ? path : path.replace(/^\/api/, ''), // Required for making the request to the correct API server path and endpoint
      }
    },
    // fs: {
    //   allow: [
    //     // Allow serving files from the project root directory
    //     path.resolve(__dirname),
    //     // Allow serving files from the client directory
    //     path.resolve(__dirname, 'client'),
    //   ],
    // },
  },
})
