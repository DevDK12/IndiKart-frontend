import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@components": path.resolve(__dirname, './src/components'),
      "@ui": path.resolve(__dirname, './src/components/ui'),
      "@layout": path.resolve(__dirname, './src/components/layout'),
      "@pages": path.resolve(__dirname, './src/components/pages'),
      "@reducer": path.resolve(__dirname, './src/redux/reducer'),
      "@api": path.resolve(__dirname, './src/redux/api'),
      "@types": path.resolve(__dirname, './src/Types'),
      "@utils": path.resolve(__dirname, './src/utils'),
      "@assets": path.resolve(__dirname, './src/assets'),
    }
  }
})
