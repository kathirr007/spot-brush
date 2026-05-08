import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const auth = useAuthStore()
    auth.refreshToken()
  }
})
