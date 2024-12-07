import { toast } from 'react-hot-toast';
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
    registerUser,
    loginUser,
    logout} from './operations';


const INITIAL_STATE = {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    error: false,
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
  
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