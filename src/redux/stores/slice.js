import { toast } from 'react-hot-toast';
import { createSlice } from "@reduxjs/toolkit";
import { fetchStores } from './operation';

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
  };
  
  const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.error.message;;
  };

const INITIAL_STATE = {
  stores: [],
  loading: false,
  error: null,
};

export const storeSlice = createSlice({
    name: "stores",
    initialState: INITIAL_STATE,
  
    extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, handlePending)
      .addCase(fetchStores.fulfilled, (state, action) => {
        console.log('Payload:', action.payload);
          state.stores = action.payload;
          state.isLoggedIn = true;
          toast.success('You have stores✅');
        })
        .addCase(fetchStores.rejected, handleRejected)

    },});

    export const storeReducer = storeSlice.reducer;