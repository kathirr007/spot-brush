import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        dark: {
          colors: {
            primary: '#ff6634',
            secondary: '#dea38e',
            accent: '#f2f2f5',
            error: '#f44336',
            warning: '#fd8811',
            info: '#3d2e38',
            success: '#7f9949',
          },
        },
        light: {
          colors: {
            primary: '#ff6634',
            secondary: '#dea38e',
            accent: '#f2f2f5',
            error: '#bd0303',
            warning: '#fd8811',
            info: '#3d2e38',
            success: '#7f9949',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
