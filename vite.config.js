import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2015',
    cssTarget: 'chrome61'
  },
  esbuild: {
    target: 'es2015'
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    cors: true,
    allowedHosts: [
      'd643npuxe28ag.cloudfront.net',
      '.cloudfront.net',
      'localhost',
      '140.112.31.164',
      '.amazonaws.com'
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }
  }
})
