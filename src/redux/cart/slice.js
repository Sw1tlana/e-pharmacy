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
    items: [],
    loading: false,
    error: null,
};

  export const cartSlice = createSlice({
      name: "cart",
      initialState: INITIAL_STATE,

      reducers: {
        addToCart: (state, action) => {
          const existingItem = state.items.find(item => item.id === action.payload.id);
          if (existingItem) {
            existingItem.quantity += 1; 
          } else {
            state.items.push({ ...action.payload, quantity: 1 });
          }
        },
        removeFromCart: (state, action) => {
          state.items = state.items.filter(item => item.id !== action.payload.id); 
        },
        incrementItem: (state, action) => {
          const item = state.items.find(item => item.id === action.payload); 
          if (item) {
            item.quantity += 1; 
          }
        },
        decrementItem: (state, action) => {
          const item = state.items.find(item => item.id === action.payload); 
          if (item && item.quantity > 0) {
            item.quantity -= 1; 
          }
        },
      },
        extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, (state, action) => {
            console.log('Payload:', action.payload); 
            state.loading = false;
            state.items = [...state.items, ...action.payload];
            })
            .addCase(fetchCart.rejected, handleRejected)

        },});
        
    export const {
     addToCart,
     removeFromCart,
     incrementItem, 
     decrementItem
    } = cartSlice.actions;

    export const CartReducer = cartSlice.reducer;