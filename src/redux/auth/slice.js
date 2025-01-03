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
        state.isLoggedIn = true;
        toast.success('You have registered✅');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        console.log(action.payload.refreshToken);

        state.isLoggedIn = true;
        toast.success('You are logged in✅');
      })
    .addCase(logout.fulfilled, (state) => {
      state.user = INITIAL_STATE.user;
      state.token = null;
      state.refreshToken = null;
      toast.success('Logout successful');
    })
    .addCase(refreshUser.pending, (state) => {
      state.isRefreshing = true;
      state.error = false;
    })
    .addCase(refreshUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload; 
      toast.success('User data refreshed successfully');
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

    export const { setToken } = authSlice.actions;

    export const authReducer = authSlice.reducer;