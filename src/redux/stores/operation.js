import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStores } from "../services/authServices";

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