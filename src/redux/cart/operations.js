import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCart, 
         updateCart,
         checkoutCart
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
  async ({ email, updatedProducts, paymentMethod }, { rejectWithValue }) => {
    try {
      if (!updatedProducts || !Array.isArray(updatedProducts) || updatedProducts.length === 0) {
        throw new Error('Updated products are required and should be an array.');
      }
      const response = await updateCart(email, updatedProducts, paymentMethod);
      return { updatedProducts: response.data };  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);


export const fetchCheckoutData = createAsyncThunk(
  'cart/fetchCheckoutData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await checkoutCart(formData);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);