import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const instance = axios.create({
    baseURL: config.public.baseURL,
  })

  return {
    provide: {
      axios: instance,
    },
  }
})
