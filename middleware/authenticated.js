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
    if (store.state.auth) {
        if (new Date(store.state.auth.te) < new Date(Date.now())) {
            store.dispatch("clearAuth", redirect);
        }
    } else {
        // $toast.show(
        //     `Hello..! <br>You've not logged in. Please login to access your dashboard.`, { duration: 6000 }
        // )
        return redirect('/auth/signin')
    }
}
