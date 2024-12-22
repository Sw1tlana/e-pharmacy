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
   "cart/fetchUpdataCart",
   async({ productId, quantity }, thunkAPI) => {
      try {
       const response = await updateCart(productId, quantity);
       return response;
      }catch(error) {
         return thunkAPI.rejectWithValue(error.message); 
      }
   }
);