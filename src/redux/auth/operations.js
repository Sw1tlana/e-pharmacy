import { createAsyncThunk } from '@reduxjs/toolkit';

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
    "auth/register",
    async(formData, thunkAPI) => {
        console.log('Data sent to API:', formData);
        try {
            const response = await requestSingUp(formData);
            console.log('API Response:', response);
            return response;
        }catch(error) {
            console.error('API Error:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async(formData, thunkAPI) => {
        try {
            const response = await requestSingIn(formData);
            return response;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message); 
        }
    }

);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        console.log('Перевірка токена з Redux:', persistedToken);

        if (persistedToken === null) {
            console.log('Токен не знайдено, не вдалося отримати дані користувача');
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        try {
            console.log('Встановлюємо заголовок Authorization');
            setAuthHeader(persistedToken);
            console.log('Запит на отримання інформації про користувача...');
            const res = await getInfo();
            console.log('Отримано дані користувача:', res.data);
            return res.data;
        } catch (error) {
            console.error('Помилка при отриманні даних користувача:', error.message);
            return thunkAPI.rejectWithValue(error.message);
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
        if (!token || !refreshToken) {
          console.error("Токен або refreshToken відсутній, неможливо оновити.");
          return thunkAPI.rejectWithValue("Токен або refreshToken відсутній");
        }

        const response = await refreshAuthToken(token, refreshToken);  

        if (response?.token) {
          setToken(response.token);
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
