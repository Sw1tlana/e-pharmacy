import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignUp,
         requestSignIn,
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

      dispatch(setToken({ token, refreshToken }));
      console.log(token, refreshToken);

      return { user, token, refreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token, refreshToken } = state.auth; 

    if (!token || !refreshToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const userData = await getRefreshUser(token); 
      const newToken = userData.token;
      const newRefreshToken = userData.refreshToken; 

     dispatch(setToken({ token: newToken, refreshToken: newRefreshToken }));

      setAuthHeader(newToken);

      return { token: newToken, refreshToken: newRefreshToken }; 
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
