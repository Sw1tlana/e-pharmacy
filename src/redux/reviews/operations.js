import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReviews } from '../services/authServices';

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async(_, thunkAPI) => {
        try {
        const response = await getReviews();
        return response;
        }catch(error) {
            return thunkAPI.rejectWithValue(error.message); 
        }
    }
);