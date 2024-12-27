export const selectUser = ((state) => state.auth.user);
console.log('Current User:', selectUser);

export const selectEmail = ((state) => state.auth.email);

export const selectToken = ((state) => state.auth.token);

export const selectIsLoggedIn = ((state) => state.auth.isLoggedIn);
console.log('Is logged in:', selectIsLoggedIn);

export const selectIsRefreshing = ((state) => state.auth.isRefreshing);

export const selectAutchError = ((state) => state.auth.error);