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
    items: [],
    loading: false,
    error: null,
};

  export const cartSlice = createSlice({
      name: "cart",
      initialState: INITIAL_STATE,

      reducers: {
        addToCart: (state, action) => {
          state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        incrementItem: (state, action) => {
          const id = action.payload;
          const index = state.items.findIndex(item => item.id === id);
          if (index !== -1) {
            state.items[index].quantity += 1; // збільшуємо кількість товару в корзині
          } else {
            state.items.push({ id, quantity: 1 }); // додаємо новий товар з кількістю 1
          }
      },
      decrementItem: (state, action) => {
          const id = action.payload;
          const index = state.items.findIndex(item => item.id === id); // шукаємо товар по id
          if (index !== -1 && state.items[index].quantity > 1) {
              state.items[index].quantity -= 1; // якщо товар є, зменшуємо кількість
          } else {
              state.items = state.items.filter(item => item.id !== id); // якщо кількість <= 1, видаляємо товар
          }
      },
      },
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
        
    export const {
     addToCart,
     removeFromCart,
     incrementItem, 
     decrementItem
    } = cartSlice.actions;

    export const CartReducer = cartSlice.reducer;