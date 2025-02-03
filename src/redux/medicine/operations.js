import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMedicines,
        getMedicinesId
 } from '../services/authServices';

export const fetchMedicines = createAsyncThunk(
    "medicine/fetchMedicines",
    async ({ page, limit, filters = {} }, thunkAPI) => {
        try {
            const queryParams = new URLSearchParams({
                page,
                limit,
                category: filters.category || '', 
                query: filters.query || '', 
            }).toString();
            const response = await getMedicines(`?${queryParams}`);
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

export const fetchMedicinesId = createAsyncThunk(
    "medicine/fetchMedicinesId",
    async(_id, thunkAPI) => {
        try {
            const response = await getMedicinesId(_id);
            return response; 

        }catch(error) {
          return thunkAPI.rejectWithValue(error.message);  
        }
    }
);
