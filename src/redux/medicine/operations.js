import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMedicines } from '../services/authServices';

export const fetchMedicines = createAsyncThunk(
    "medicine/fetchMedicines",
    async ({ page, limit, filters = {} }, thunkAPI) => {
        try {
            const queryParams = new URLSearchParams({ page, limit, ...filters }).toString();
            const response = await getMedicines(`?${queryParams}`);

            if (!response || !response.products || response.products.length === 0) {
                throw new Error('No products found');
            }
            return response;
        } catch (error) {

            const errorDetails = {
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
                data: error.response?.data || null,
            };

            return thunkAPI.rejectWithValue(errorDetails);
        }
    }
);