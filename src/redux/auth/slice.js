import { toast } from 'react-hot-toast';
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser,
    logout,
    refreshToken } from './operations';


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
  
    extraReducers: (builder) => {
    builder
    .addCase(registerUser.fulfilled, (state, action) => {
      console.log('Payload:', action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        toast.success('You have registered✅');
      })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        toast.success('You are logged in✅');
    })
    .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
    })
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;  
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token; 
        state.isRefreshing = false; 
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isRefreshing = false;  
        state.error = true;
        toast.error('Failed to refresh token ❌');  
      })
        .addMatcher(isAnyOf(
        registerUser.pending, loginUser.pending, logout.pending),
        (state) => {
        state.error = false;
        })
        .addMatcher(isAnyOf(
            registerUser.rejected, loginUser.rejected, logout.rejected),
            (state) => {
              state.error = true;
              toast.error('Oops! Something went wrong ❌');
            })

    },});

export const authReducer = authSlice.reducer;