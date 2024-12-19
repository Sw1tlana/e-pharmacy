import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./operations";

const handlePending = (state) => {
   state.loading = true;
   state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.error.message;
};

const INITIAL_STATE = {
    cart: [],
    loading: false,
    error: null,
};

  export const cartSlice = createSlice({
      name: "cart",
      initialState: INITIAL_STATE,

        extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, (state, action) => {
            console.log('Payload:', action.payload); 
            state.loading = false;
            state.cart = action.payload; 
            })
            .addCase(fetchCart.rejected, handleRejected)

        },});

    export const CartReducer = cartSlice.reducer;