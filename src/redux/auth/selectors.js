export const selectUser = ((state) => state.auth.user);

export const selectEmail = ((state) => state.auth.email);

export const selectToken = ((state) => state.auth.token);

export const selectIsLoggedIn = ((state) => state.auth.isLoggedIn);

export const selectAutchError = ((state) => state.auth.error);