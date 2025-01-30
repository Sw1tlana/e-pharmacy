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
  async ({ userId, updatedProducts, paymentMethod  }, { rejectWithValue }) => {
    try {
      const response = await updateCart(userId, updatedProducts, paymentMethod );
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
      return response.cart;  
    } catch (error) {
      console.error("Checkout error:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);