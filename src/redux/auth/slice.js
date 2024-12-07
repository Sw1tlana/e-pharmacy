import { toast } from 'react-hot-toast';
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
    register,
    login,
    logout} from './operations';


const INITIAL_STATE = {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: false,
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
  
    extraReducers: (builder) => {
    builder
    .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('You have registered✅');
      })
    .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('You are logged in✅');
    })
    .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
    })
        .addMatcher(isAnyOf(
        register.pending, login.pending, logout.pending),
        (state) => {
        state.error = false;
        })
        .addMatcher(isAnyOf(
            register.rejected, login.rejected, logout.rejected),
            (state) => {
              state.error = true;
              toast.error('Oops! Something went wrong ❌');
            })

    },});

export const authReducer = authSlice.reducer;