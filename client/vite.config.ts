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
        target: `http://localhost:${process.env.PORT || 3001}/`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Required for making the request to the correct API server path and endpoint
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
