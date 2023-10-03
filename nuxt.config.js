// import colors from 'vuetify/es5/util/colors'

module.exports = {
  server: {
    // port: 3100, // default 3000
    port: process.env.PORT || 5600,
  },
  telemetry: false,
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/sb-logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap' }
    ]
  },
  /*
    ** Customize the progress-bar color
    */
   loading: { color: '#ff6634', throttle: 0 },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss'
  ],
  /* Style resources */
  /* styleResources: {
      // your settings here
      sass: [],
      scss: [
          '~assets/scss/_variables.scss'
      ],
      less: [],
      stylus: []
  }, */
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/setTokenAxios' },
    // { src: '~/plugins/persist-state.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false }
    // { src: '~/plugins/keymage.client' },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // '@nuxtjs/style-resources',
    '@nuxtjs/vuetify',
    // ['@edgio/nuxt/module', { edgioSourceMaps: true }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  toast: {
      position: 'top-right',
      register: [ // Register custom toasts
          {
              name: 'my-error',
              message: 'Oops...Something went wrong',
              options: {
                  type: 'error'
              }
          },
      ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:5600',
    // proxy: true
  },
  proxy: {
      // 'http://localhost:3000': { target: 'http://localhost:3000' },
      // '/api/loadwhiteboard': 'http://localhost:3000',
      /* "/api": process.env.BASE_URL || "http://localhost:3000",
      "/uploads": process.env.BASE_URL || "http://localhost:3000", */
      // "/api/upload": "http://localhost:3000/api/upload",
      /* "/ws-api": {
          target: process.env.NODE_ENV !== 'production' ? "ws://localhost:3000" : 'ws://spot-brush-whiteboard.herokuapp.com',
          ws: true,
      }, */
      // '/api2/': 'http://api.another-website.com'
  },
  /* server Middleware */
  serverMiddleware: [
    '~/server/routes/index'
  ],
  /* server Middleware end */
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/scss/_variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#ff6634',
          secondary: '#dea38e',
          accent: '#f2f2f5',
          error: '#f44336',
          warning: '#fd8811',
          info: '#3d2e38',
          success: '#7f9949'
        },
        light: {
          primary: '#ff6634',
          secondary: '#dea38e',
          accent: '#f2f2f5',
          error: '#bd0303',
          warning: '#fd8811',
          info: '#3d2e38',
          success: '#7f9949'
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    babel: {
      presets(env, [ preset, options ]) {
        return [
          [ "@babel/preset-env", {
              "useBuiltIns": "usage", // "usage" | "entry" | false, defaults to false.
              "corejs": "3.0.0",
              "targets": {
                  "esmodules": true,
                  "ie": "11"
              }
            }
          ]
        ]
      }
    },
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
}
