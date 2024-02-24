import  cookieParser from 'cookie-parser'
const cookieparser = process.server ? cookieParser : undefined

export const state = () => {
  return {
    auth: null,
    whiteboardKeybinds: false,
    isWhiteboard: false,
  }
}

export const getters = {
  isAuth(state) {
    return state.auth || null
  },
  isAuthenticated(state) {
    return !!state.auth
  }
}

export const mutations = {
  setAuth (state, auth, error) {
    state.auth = auth
    if(error) console.log('[MUTATION] setAuth', error);
  },
  clearAuth(state, redirect) {
    state.auth = null
    redirect('/auth/login')
  },
  removeKeyBinds(state, status) {
    state.whiteboardKeybinds = status
  },
  setWhiteboard(state, status) {
    state.isWhiteboard = status
  }
}
export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req, res }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.JSONCookie(req.headers.cookie)
      try {
        if(parsed.token) {
          return this.$axios.$post('/auth/refresh-token').then(result => {
              try {
                commit('setAuth',result)
                res.cookie('token', result.refresh_token, { expires: new Date(result.refresh_token_expired), httpOnly: true })
              } catch(err) {
                commit('setAuth', null, err)
              }
            }).catch((err)=>{
              commit('setAuth', null, err)
            });
          } else {
            commit('setAuth',null)
          }
      } catch (err) {
        commit('setAuth', null, err)
      }
    }
  },
  clearAuth({ commit }, redirect) {
    commit('clearAuth', redirect)
  },
  refreshToken({commit, state}) {
    // debugger
    if(state.auth) {
      if(new Date(Date.now()) > new Date(state.auth.jwt_expired)) {
        return this.$axios.$post('/auth/refresh-token').then(result => {
          try {
            commit('setAuth',result)
          } catch(err) {
            commit('setAuth', null, err)
          }
        }).catch((err)=>{
          commit('setAuth', null, err)
        });
      }
    } else {
      commit('setAuth', null)
    }
  }
}
