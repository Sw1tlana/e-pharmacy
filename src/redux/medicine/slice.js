import { createSlice } from "@reduxjs/toolkit";
import { fetchMedicines } from "./operations";

const handlePending = (state) => {
   state.loading = true;
   state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.error.message;
};

const INITIAL_STATE = {
    medicines: [],
    loading: false,
    error: null,
  };

  export const medicinesSlice = createSlice({
      name: "medicines",
      initialState: INITIAL_STATE,
    
      extraReducers: (builder) => {
      builder
        .addCase(fetchMedicines.pending, handlePending)
        .addCase(fetchMedicines.fulfilled, (state, action) => {
          console.log('Payload:', action.payload);
            state.medicines = action.payload;
            state.isLoggedIn = true;
          })
          .addCase(fetchMedicines.rejected, handleRejected)
      },});
  
      export const medicinesReducer = medicinesSlice.reducer;