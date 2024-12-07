import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSingUp,
         requestSingIn,
         requestLogOut,
         clearAuthHeader
 } from '../services/authServices';

export const register = createAsyncThunk(
    "auth/register",
    async(formData, thunkAPI) => {
        try {
            const response = await requestSingUp(formData);
            return response;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
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
