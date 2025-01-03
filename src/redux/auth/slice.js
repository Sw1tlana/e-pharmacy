import { toast } from 'react-hot-toast';
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser,
    logout,
    refreshUser } from './operations';

const INITIAL_STATE = {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    error: false,
    isRefreshing: false,
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    setToken(state, action) {
      const { token, refreshToken } = action.payload;
      state.token = token; // Зберігаємо новий токен
      state.refreshToken = refreshToken; // Зберігаємо refresh токен
      state.isAuthenticated = true; // Оновлюємо статус автентифікації
    },

    // Інші можливі редюсери, наприклад для logout
    clearToken(state) {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },

    extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('You have registered✅');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('You are logged in✅');
      })
    .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
    })
    .addCase(refreshUser.pending, (state) => {
      state.isRefreshing = true;
      state.error = false;
    })
    .addCase(refreshUser.fulfilled, (state, action) => {
      state.isRefreshing = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    })
    .addCase(refreshUser.rejected, (state) => {
      state.isRefreshing = false;
      state.error = true;
    }) 
        .addMatcher(isAnyOf(
        registerUser.pending, loginUser.pending, logout.pending),
        (state) => {
        state.error = false;
        state.isRefreshing = false;
        })
        .addMatcher(isAnyOf(
            registerUser.rejected, loginUser.rejected, logout.rejected),
            (state) => {
              state.error = true;
            })

    },});

    export const { setToken, clearToken } = authSlice.actions;

    export const authReducer = authSlice.reducer;