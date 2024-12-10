import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStores,
         getNearestStores
 } from "../services/authServices";

export const fetchStores = createAsyncThunk(
    "stores/fetchStores", 
    async(_, thunkAPI ) => {
        try {
         const response = await getStores();
         return response;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const nearestStores = createAsyncThunk(
    "stores/nearestStores",
    async(_, thunkAPI ) => {
        try {
        const response = await getNearestStores();
        return response;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message); 
        }
    }
);