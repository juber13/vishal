import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy:{
    // '/api': {
    //     target: 'http://localhost:8080', // Backend URL
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
  }
})
//server:{
// port:8080,
// }