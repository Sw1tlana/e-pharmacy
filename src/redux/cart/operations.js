import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCart, 
         updateCart
 } from '../services/authServices';

export const fetchCart = createAsyncThunk(
   "cart/fetchCart", 
   async(_, thunkAPI) => {
    try {
       const response = await getCart();
       return response;
    }catch(error) {
        return thunkAPI.rejectWithValue(error.message); 
    }
   }
);

export const fetchUpdateCart = createAsyncThunk(
  'cart/fetchUpdataCart',
  async ({ userId, updatedProducts }, { rejectWithValue }) => {
    try {
      const response = await updateCart(userId, updatedProducts);
      return { updatedProducts: response.data };  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);