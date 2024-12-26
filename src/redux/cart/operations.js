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
   async ({ userId, productId, quantity }, thunkAPI) => {
     try {
       // Перевірка, чи є userId
       if (!userId) {
         return thunkAPI.rejectWithValue('User ID is required');
       }
 
       const updatedProducts = [{ productId, quantity }];
       const response = await updateCart(userId, updatedProducts);
       return { productId, quantity, ...response };
     } catch (error) {
       console.error('Помилка при оновленні кошика:', error);
       return thunkAPI.rejectWithValue(error.message);
     }
   }
 );