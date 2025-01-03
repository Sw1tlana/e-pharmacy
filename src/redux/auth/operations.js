import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSingUp,
         requestSingIn,
         requestLogOut,
         clearAuthHeader,
         refreshAuthToken,
         getInfo,
         setAuthHeader
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
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      console.log('Login formData:', formData);
      const response = await requestSingIn(formData);
      console.log('Login response:', response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
    'auth/refreshUser',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
  
      setAuthHeader(token);
      
      try {
        const response = await refreshAuthToken();
        return response;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
      }
    },
    {
      condition: (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;
  
        if(!token) return false;
        return true;
      }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async(_, thunkAPI) => {
        try {
           await requestLogOut();
            clearAuthHeader();
            return {};
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message);  
        }
    }
);
