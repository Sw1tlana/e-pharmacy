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
    reducers: {
      setToken(state, action) {
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
      },
  },
    extraReducers: (builder) => {
    builder
    .addCase(registerUser.fulfilled, (state, action) => {
      console.log('Payload:', action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;  
      console.log(action.payload.token);   
      state.isLoggedIn = true;
        toast.success('You have registered✅');
      })
    .addCase(loginUser.fulfilled, (state, action) => {
      console.log('Payload of loginUser:', action.payload); 
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.refreshToken = action.payload.refreshToken;
        toast.success('You are logged in✅');
        console.log('Updated state:', state);
    })
    .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
    })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
    })
    .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
    })
    .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
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