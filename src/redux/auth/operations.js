import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignUp,
         requestSignIn,
         requestLogOut,
         getRefreshToken,
         setAuthHeader
 } from '../services/authServices.js';
import { setToken } from './slice.js';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await requestSignUp(formData);

      const { token, refreshToken, user } = response;

      thunkAPI.dispatch(setToken({ token, refreshToken }));
      setAuthHeader(token);

      return { user, token, refreshToken };
    } catch (error) {
      console.error('Error during registration:', error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Register failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await requestSignIn(email, password);
      console.log('Response from server:', response);
      const { token, refreshToken, user } = response;

      console.log('Token:', token);
      console.log('RefreshToken:', refreshToken);
      console.log('User:', user);

      thunkAPI.dispatch(setToken({ token, refreshToken }));
      return { user, token, refreshToken };
    } catch (error) {
      console.error('Login error:', error.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

 export const refreshUser = createAsyncThunk(
    'auth/refreshToken',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const { refreshToken } = state.auth;
  
      if (!refreshToken) {
        return thunkAPI.rejectWithValue('No refresh token available');
      }
  
      try {
        const { token, refreshToken: newRefreshToken } = await getRefreshToken(refreshToken);
        setToken({ token, refreshToken: newRefreshToken });
        setAuthHeader(token);
        return { token, refreshToken: newRefreshToken };
      } catch (error) {
        console.error('Error during token refresh:', error);
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Token refresh failed');
      }
    }
  );
  

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
      try {
          await requestLogOut();
          return {};
      } catch (error) {
          console.error('Error during logout:', error);
          return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
      }
  }
);
