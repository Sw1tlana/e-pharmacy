import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMedicines } from '../services/authServices';

export const fetchMedicines = createAsyncThunk(
    "medicine/fetchMedicines",
    async(_, thunkAPI) => {
        try {
            const response = await getMedicines();
            return response;
        }catch(error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);