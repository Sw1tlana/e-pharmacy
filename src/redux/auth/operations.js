import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshTokenSchema } from '../../shemas/refreshTokenSchema.js';

import { requestSingUp,
         requestSingIn,
         requestLogOut,
         clearAuthHeader,
         refreshAuthToken,
         getInfo,
         setAuthHeader
 } from '../services/authServices.js';
import { setToken } from './slice.js';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
      console.log('Data sent to API:', formData);
      try {
        const response = await requestSingUp(formData);
        console.log('API Response:', response);
  
        // Перевірка на наявність користувача і токена
        if (response?.token && response?.user) {
          setAuthHeader(response.token);
          return {
            user: response.user,
            token: response.token
          };
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('API Error:', error);
        return thunkAPI.rejectWithValue(error.message || 'Registration failed');
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

      setAuthHeader(response.token, response.refreshToken);
      console.log('Token:', response.token);
      console.log('Refresh Token:', response.refreshToken);

      return {
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      };
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);
        return thunkAPI.rejectWithValue(error.response.data.message || 'Server error');
      }

      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const refreshUser = createAsyncThunk(
    'auth/refreshUser',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const refreshToken = state.auth.refreshToken;
  
      if (!refreshToken) {
        return thunkAPI.rejectWithValue("No refresh token available");
      }
  
      try {
        const { data } = await axios.post("/user/refresh", { refreshToken });
        setAuthHeader(data.token);  // Оновлення токену в заголовках
        return data;
      } catch (error) {
        console.error("Refresh token error:", error);
        return thunkAPI.rejectWithValue(error.message || "Refresh failed");
      }
    }
);

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const refreshToken = state.auth.refreshToken; 
  
      try {
        await refreshTokenSchema.validate({ refreshToken });
  
        if (!token || !refreshToken) {
          console.error("Токен або refreshToken відсутні, неможливо оновити.");
          return thunkAPI.rejectWithValue("Токен або refreshToken відсутні");
        }
  
        const response = await refreshAuthToken(token, refreshToken);
  
        if (response?.data?.token && response?.data?.refreshToken) {
          thunkAPI.dispatch(setToken({
            token: response.data.token,
            refreshToken: response.data.refreshToken
          }));
          return response.data;
        } else {
          throw new Error('Некоректна відповідь на токен');
        }
      } catch (error) {
        console.error("Не вдалося оновити токен:", error.message);
        return thunkAPI.rejectWithValue("Не вдалося оновити токен");
      }
    },
    {
      condition: (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        const refreshToken = state.auth.refreshToken;
  
        if (!token || !refreshToken) {
          console.warn("No token or refreshToken found in state. Aborting refresh.");
          return false;
        }
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
