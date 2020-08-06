
export default {
  server: {
    // port: 3100, // default 3000
    port: process.env.PORT || 4600,
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
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
      title: process.env.npm_package_name || '',
      meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
          { hid: 'og:title', name: 'og:title', content: 'Spot Brus | Collabarative WhiteBoard'},
          { hid: 'og:locale', name: 'og:locale', content: 'en_US'},
          { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL || 'http://localhost:4600'},
          { hid: 'og:type', name: 'og:type', content: 'website'},
          { hid: 'og:description', name: 'og:description', content: `Spot Brus | Collabarative WhiteBoard`},
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            // { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' }
            // { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css' }
        ],
        script: [
        //   {src: 'https://kit.fontawesome.com/df4e4a88c4.js', crossorigin :'anonymous'},
          // {src: 'https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js', crossorigin :'anonymous'}
        ],
  },
    /*
  ** Customize the progress-bar color
  */
 loading: { color: '#ff6634', throttle: 0 },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
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
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
