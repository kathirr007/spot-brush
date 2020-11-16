/* export default function (context) {
  // debugger
  if(context.store.state.auth) {
    if(new Date(context.store.state.auth.te) < new Date(Date.now())){
      context.store.dispatch("clearAuth", context.redirect);
    }
  } else {
    return context.redirect('/auth/signin')
  }
} */
export default function({ $toast, store, redirect }) {
/*     if (store.state.auth) {
        console.log('User authenticated...')
        if (new Date(store.state.auth.te) < new Date(Date.now())) {
            console.log('redirecting...')
            store.dispatch("clearAuth", redirect);
        }
    }
    if(!store.state.auth) {
      debugger
      console.log('User not authenticated, redirecting...')
      return redirect('/auth/signin')
    } */
    const isAuth = store.getters['isAuthenticated']

    if(!isAuth) {
      return redirect('/auth/signin')
    }
}
