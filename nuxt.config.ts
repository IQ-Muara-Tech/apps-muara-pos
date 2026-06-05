import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vite-pwa/nuxt', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Muara POS',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo/logo-muara-pos.png' }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,json,png,svg,ico}'],
      navigateFallback: null,
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\/[^\/]+\/api\/.*/i,
          handler: 'NetworkFirst',
          method: 'GET',
          options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 300 }
          }
        }
      ]
    },
    manifest: {
      name: 'Muara POS',
      short_name: 'Muara',
      description: 'Point of Sale System',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#109594',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        { src: '/icons/192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icons/512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api-pos.muaratech.com/api'
    }
  },
  compatibilityDate: '2025-06-05'
})
