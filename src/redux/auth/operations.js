import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSingUp,
         requestSingIn,
         requestLogOut,
         clearAuthHeader,
         setAuthHeader,
         getRefreshUser,
         getRefreshToken
 } from '../services/authServices.js';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
      console.log('Data sent to API:', formData);
      try {
        const response = await requestSingUp(formData);
        console.log('API Response:', response);
          return response
      } catch (error) {
        console.error('API Error:', error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const data = await requestSingIn(credentials); 
      console.log('Login response:', response); 
      const { token, refreshToken } = data; 
      console.log('Login data:', data); 
      thunkAPI.dispatch(setToken({ token, refreshToken }));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token } = state.auth;

    if (!token) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(token);
      const user = await getRefreshUser(); 
      return { name: user.name, email: user.email };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { refreshToken } = state.auth;

    if (!refreshToken) {
      return thunkAPI.rejectWithValue('No refresh token available');
    }

    try {
      const { token, refreshToken: newRefreshToken } = await getRefreshToken(refreshToken);
      thunkAPI.dispatch(setToken({ token, refreshToken: newRefreshToken }));
      setAuthHeader(token);
      return { token, refreshToken: newRefreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await requestLogOut();
      clearAuthHeader();
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
