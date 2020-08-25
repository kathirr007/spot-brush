export default function({store, redirect}) {
    // const isAuth = store.getters['authentication/isAuthenticated']
    const isLoggedIn = store.state.auth

    if(isLoggedIn) {
        // navigate later to notAuthorized page
        return redirect('/dashboard')
    }
}
