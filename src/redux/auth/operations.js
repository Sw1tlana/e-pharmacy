import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignUp,
         requestSignIn,
         requestLogOut,
         clearAuthHeader,
         getRefreshToken
 } from '../services/authServices.js';
import { setToken } from './slice.js';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
      console.log('Data sent to API:', formData);
      try {
        const response = await requestSignUp(formData);
        console.log('API Response:', response);
          return response;
      } catch (error) {
        console.error('API Error:', error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    console.log('Credentials for login:', credentials); 
    try {

      const response = await requestSignIn(credentials); 
      const { token, refreshToken, user } = response.data; 

      thunkAPI.dispatch(setToken({ token, refreshToken }));
      console.log(token, refreshToken);

      return { user, token, refreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { refreshToken } = state.auth;

    if (!refreshToken) {
      return thunkAPI.rejectWithValue('No refresh token available.');
    }

    try {
      const response = await getRefreshToken(refreshToken);
      thunkAPI.dispatch(setToken(response));
      const userResponse = await getUser();
      return { user: userResponse, ...response };
    } catch (error) {
      toast.error('Failed to refresh user session.');
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
      return { token, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Error during token refresh:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
    });
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
