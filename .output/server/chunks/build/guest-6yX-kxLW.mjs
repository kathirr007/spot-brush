function guest({ store, redirect }) {
  const isLoggedIn = store.state.auth;
  if (isLoggedIn) {
    return redirect("/dashboard");
  }
}

export { guest as default };
//# sourceMappingURL=guest-6yX-kxLW.mjs.map
