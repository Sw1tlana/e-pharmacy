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
    refreshToken: null,
    isLoggedIn: false,
    error: false,
    isRefreshing: false,
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
      setToken(state, action) {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      },
    },

    extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        toast.success('Register successful');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        toast.success('Login successful');
      })
    .addCase(logout.fulfilled, (state) => {
      state.user = INITIAL_STATE.user;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      toast.success('Logout successful');
    })
    .addCase(refreshUser.pending, (state) => {
      state.isRefreshing = true;
      state.error = false;
    })
    .addCase(refreshUser.fulfilled, (state, action) => {
      const { token, refreshToken } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isRefreshing = false; 
    })
    .addCase(refreshUser.rejected, (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
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
              toast.error('Incorrect email or password');
            })

    },});

    export const { setToken } = authSlice.actions;

    export const authReducer = authSlice.reducer;