import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMedicines } from '../services/authServices';

export const fetchMedicines = createAsyncThunk(
    "medicine/fetchMedicines",
    async({ page, limit, filters = {} }, thunkAPI) => {
        try {
            console.log('Preparing query parameters...');
            const queryParams = new URLSearchParams({
                page,
                limit,
                ...filters,
            }).toString();

            console.log(`Fetching medicines from API with params: ${queryParams}`); 
            const response = await getMedicines(`?${queryParams}`);

            console.log('Fetched medicines successfully:', response); 
            return response;
        }catch(error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);