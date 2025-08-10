import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@productDetail': resolve(__dirname, 'src/assets/components/productDetail'),
      '@productDetailConstant': resolve(
        __dirname,
        'src/assets/constants/productDetail/productDetailConstant.ts'
      ),
      '@productList': resolve(
        __dirname,
        'src/assets/components/productList'
      ),
      '@productListConstant': resolve(
        __dirname,
        'src/assets/constants/productList/productListConstant.ts'
      ),
      '@cartConstants': resolve(
        __dirname,
        'src/assets/constants/cart/cartConstants.ts'
      ),
      '@paginationConstant': resolve(
        __dirname,
        'src/assets/constants/productDetail/paginationConstant.ts'
      ),
    },
  },
})
