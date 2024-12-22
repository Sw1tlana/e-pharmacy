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
          const existingItem = state.items.find(item => item.id === action.payload.id);
          if (existingItem) {
            existingItem.quantity += 1; // Якщо товар вже є в кошику, збільшуємо кількість
          } else {
            state.items.push({ ...action.payload, quantity: 1 }); // Якщо товару немає, додаємо його з кількістю 1
          }
        },
        removeFromCart: (state, action) => {
          state.items = state.items.filter(item => item.id !== action.payload.id); // Видаляємо товар за id
        },
        incrementItem: (state, action) => {
          const item = state.items.find(item => item.id === action.payload); // Знаходимо товар за id
          if (item) {
            item.quantity += 1; // Збільшуємо кількість товару
          }
        },
        decrementItem: (state, action) => {
          const item = state.items.find(item => item.id === action.payload); // Знаходимо товар за id
          if (item && item.quantity > 0) {
            item.quantity -= 1; // Зменшуємо кількість товару
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