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

export const fetchUpdataCart = createAsyncThunk(
  'cart/fetchUpdataCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCart(userId, productId, { quantity });
      return { productId, quantity: response.data.quantity };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);