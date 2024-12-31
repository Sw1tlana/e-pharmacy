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
    async(formData, thunkAPI) => {
        console.log('Data sent to API:', formData);
        try {
          console.log('Data sent to API:', formData);
          const response = await requestSingUp(formData);
          console.log('API Response:', response);
    
          // Перевірка, чи є користувач і токен
          if (response && response.token && response.user) {
            // Зберігаємо токен у заголовках
            setAuthHeader(response.token);
            
            // Повертаємо токен і користувача для збереження в Redux
            return {
              user: response.user,
              token: response.token
            };
          } else {
            throw new Error('Invalid API response');
          }
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
      console.log('Login successful:', response);

      return response;
      // Перевірка токенів у відповіді
      if (response.token && response.refreshToken) {
        setAuthHeader({
          token: response.token,
          refreshToken: response.refreshToken,
        });
      } else {
        throw new Error('Token or refreshToken missing in the response');
      }

      // Оновлення Redux
    } catch (error) {
      console.error("Login error:", error);

      // Якщо є відповідь сервера
      if (error.response) {
        console.error("Server response:", error.response.data);
        return thunkAPI.rejectWithValue(error.response.data.message || 'Server error');
      }

      // Помилка на рівні клієнта
      return thunkAPI.rejectWithValue(error.message || 'Network error');
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
        setAuthHeader(data.token);  // Оновлюємо токен в заголовках
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
      console.log("Token from state:", token);
      console.log("Refresh Token from state:", refreshToken);

      try {
        // Перевірка схеми для refreshToken
        await refreshTokenSchema.validate({ refreshToken });
  
        if (!token || !refreshToken) {
          console.error("Токен або refreshToken відсутній, неможливо оновити.");
          return thunkAPI.rejectWithValue("Токен або refreshToken відсутній");
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
        console.log("State after update:", state.auth);

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
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message);  
        }
    }
);
