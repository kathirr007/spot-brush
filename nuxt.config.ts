import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  app: {
    head: {
      title: 'SpotBrush',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A Collaborative Whiteboard / Sketchboard' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/sb-logo.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  css: [
    '~/assets/scss/main.scss',
    '@mdi/font/css/materialdesignicons.css',
  ],

  build: {
    transpile: ['vuetify', 'vue-toastification'],
  },

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    build: {
      rollupOptions: {
        external: ['jquery-ui', 'jquery-ui-rotatable', 'jquery-ui/ui/core', 'jquery-ui/ui/widgets/draggable', 'jquery-ui/ui/widgets/resizable', 'jquery-ui-rotatable/jquery.ui.rotatable'],
      },
    },
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5600',
    }
  },

  nitro: {
    externals: {
      inline: ['socket.io', 'express'],
    },
  },

  compatibilityDate: '2024-01-01',
})
