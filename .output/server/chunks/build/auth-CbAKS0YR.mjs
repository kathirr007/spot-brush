import { o as defineStore } from './server.mjs';

const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: null,
    whiteboardKeybinds: false,
    isWhiteboard: false
  }),
  getters: {
    isAuth: (state) => state.auth || null,
    isAuthenticated: (state) => !!state.auth
  },
  actions: {
    setAuth(auth) {
      this.auth = auth;
    },
    clearAuth() {
      this.auth = null;
    },
    setWhiteboard(status) {
      this.isWhiteboard = status;
    },
    removeKeyBinds(status) {
      this.whiteboardKeybinds = status;
    },
    async refreshToken() {
      if (!this.auth) return;
      if (/* @__PURE__ */ new Date() > new Date(this.auth.jwt_expired)) {
        try {
          const result = await $fetch("/auth/refresh-token", { method: "POST" });
          this.setAuth(result);
        } catch {
          this.setAuth(null);
        }
      }
    }
  },
  persist: true
});

export { useAuthStore as u };
//# sourceMappingURL=auth-CbAKS0YR.mjs.map
