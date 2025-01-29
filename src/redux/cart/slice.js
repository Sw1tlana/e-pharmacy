import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, 
         fetchUpdateCart 
        } from "./operations";

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
    paymentMethod: "cash",
    quantity: 1
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
      },
        extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, (state, action) => {
            console.log('Payload:', action.payload); 
            state.loading = false;
            state.items = action.payload.updatedProducts;
            state.paymentMethod = action.payload.paymentMethod || "cash"; 
            })
            .addCase(fetchCart.rejected, handleRejected)
            .addCase(fetchUpdateCart.pending, handlePending)
            .addCase(fetchUpdateCart.fulfilled, (state, action) => {
              console.log("Action payload:", action.payload);
              state.loading = false;
              const updatedItemIndex = state.items.findIndex(item => item.id === action.payload.productId);
              if (updatedItemIndex !== -1) {
                state.items[updatedItemIndex].quantity = action.payload.quantity;
              }
        })
        .addCase(fetchUpdateCart.rejected, handleRejected)
        },});
        
    export const {
     addToCart,
     removeFromCart,
    } = cartSlice.actions;

    export const CartReducer = cartSlice.reducer;