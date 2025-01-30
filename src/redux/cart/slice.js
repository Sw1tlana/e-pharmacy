import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, 
         fetchUpdateCart,
         fetchCheckoutData
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
    quantity: 1,
    checkout: []
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
        setPaymentMethod: (state, action) => {
          state.paymentMethod = action.payload;
        },
        updateQuantity: (state, action) => {
          const { productId, quantity } = action.payload;
          if (quantity < 1) return; 
          const item = state.items.find((item) => item.id === productId);
          if (item) {
            item.quantity = quantity;
          }
        },
      },
      
      extraReducers: (builder) => {
        builder
          .addCase(fetchCart.pending, handlePending)
          .addCase(fetchCart.fulfilled, (state, action) => {
            console.log('Payload:', action.payload);
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(fetchCart.rejected, handleRejected)
    
          .addCase(fetchUpdateCart.pending, handlePending)
          .addCase(fetchUpdateCart.fulfilled, (state, action) => {
            state.loading = false;
    
            if (action.payload?.updatedProducts) {
              action.payload.updatedProducts.forEach((updatedItem) => {
                const existingItem = state.items.find(item => item.id === updatedItem.id);
                if (existingItem) {
                  existingItem.quantity = updatedItem.quantity;
                }
              });
            }
          })
          .addCase(fetchUpdateCart.rejected, handleRejected)
          .addCase(fetchCheckoutData.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCheckoutData.fulfilled, (state, action) => {
            console.log('Checkout response:', action.payload);
            state.loading = false;
            state.items = []; 
            state.checkout = action.payload; 
          })
          .addCase(fetchCheckoutData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
    });
        
    export const {
     addToCart,
     removeFromCart,
     updateQuantity,
     setPaymentMethod
    } = cartSlice.actions;

    export const CartReducer = cartSlice.reducer;