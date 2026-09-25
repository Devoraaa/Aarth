import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // @ts-ignore
      babel: {
        plugins: [
          // This plugin injects data-locator attributes for the Locator.js extension
          ['@locator/babel-jsx', {
            env: 'development',
          }]
        ]
      }
    })
  ],
})
