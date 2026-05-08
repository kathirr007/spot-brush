import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: null as Record<string, any> | null,
    whiteboardKeybinds: false,
    isWhiteboard: false,
  }),

  getters: {
    isAuth: (state) => state.auth || null,
    isAuthenticated: (state) => !!state.auth,
  },

  actions: {
    setAuth(auth: Record<string, any> | null) {
      this.auth = auth
    },
    clearAuth() {
      this.auth = null
    },
    setWhiteboard(status: boolean) {
      this.isWhiteboard = status
    },
    removeKeyBinds(status: boolean) {
      this.whiteboardKeybinds = status
    },
    async refreshToken() {
      if (!this.auth) return
      if (new Date() > new Date(this.auth.jwt_expired)) {
        try {
          const result = await $fetch('/auth/refresh-token', { method: 'POST' })
          this.setAuth(result as Record<string, any>)
        } catch {
          this.setAuth(null)
        }
      }
    },
  },

  persist: true,
})
