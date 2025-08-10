import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@productDetail': path.resolve(__dirname, 'src/assets/components/productDetail'),
      '@productDetailConstant': path.resolve(
        __dirname,
        'src/assets/constants/productDetail/productDetailConstant.ts'
      ),
      '@productList': path.resolve(
        __dirname,
        'src/assets/components/productList'
      ),
      '@productListConstant': path.resolve(
        __dirname,
        'src/assets/constants/productList/productListConstant.ts'
      ),
      '@cartConstants': path.resolve(
        __dirname,
        'src/assets/constants/cart/cartConstants.ts'
      ),
      '@paginationConstant': path.resolve(
        __dirname,
        'src/assets/constants/productDetail/paginationConstant.ts'
      ),
    },
  },
})
