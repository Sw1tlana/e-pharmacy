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
    "auth/loginUser",
    async(formData, thunkAPI) => {
        try {
            const response = await requestSingIn(formData);
            return response;
        }catch(error) {
          console.error('Login error:', error.message);
            return thunkAPI.rejectWithValue(error.message); 
        }
    }

);

export const refreshUser = createAsyncThunk(
    'auth/refreshUser',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;
        const userId = state.auth.user?.id;

        console.log('Перевірка userId з Redux:', userId);
        console.log('Перевірка токена з Redux:', persistedToken);

        if (!userId) {
          console.log('ID користувача не знайдено');
          return thunkAPI.rejectWithValue('User ID is missing');
        }
    
        console.log('Перевірка userId з Redux:', userId);
        console.log('Перевірка токена з Redux:', persistedToken);
    
        if (!persistedToken) {
          console.log('Токен не знайдено, не вдалося отримати дані користувача');
          return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        
        try {
            console.log('Встановлюємо заголовок Authorization');
            setAuthHeader(persistedToken);
            console.log('Запит на отримання інформації про користувача...');
            const res = await getInfo(userId);
            console.log('Отримано дані користувача:', res);

            if (res && res.name && res.email) {
              return res; 
            } else {
              return thunkAPI.rejectWithValue('Invalid user data format');
            }
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
