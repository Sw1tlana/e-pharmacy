import { createSlice } from "@reduxjs/toolkit";
import { fetchStores,
         nearestStores
 } from './operation';

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
  };
  
  const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
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
          state.stores = action.payload;
          state.loading = false;
        })
        .addCase(fetchStores.rejected, handleRejected)
        .addCase(nearestStores.pending, handlePending)
        .addCase(nearestStores.fulfilled, (state, action) => {
            state.stores = action.payload;
            state.loading = false;
          })
          .addCase(nearestStores.rejected, handleRejected)

    },});

    export const storeReducer = storeSlice.reducer;