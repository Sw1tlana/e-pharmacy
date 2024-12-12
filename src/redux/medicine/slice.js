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
    filters: {},
    page: 1,
    limit: 4,
    totalPages: 0
  };

  export const medicinesSlice = createSlice({
      name: "medicines",
      initialState: INITIAL_STATE,

      reducers: {
      setFilters: (state, action) => {
          state.filters = action.payload;
      },
      resetFilters: (state) => {
           state.filters = {};
      },
      setPage: (state, action) => {
          state.page = action.payload;
      },
      setLimit: (state, action) => {
          state.limit = action.payload;
      },
      setTotalPages: (state, action) => {
          state.totalPages = action.payload;
      }
      },
    
      extraReducers: (builder) => {
      builder
        .addCase(fetchMedicines.pending, handlePending)
        .addCase(fetchMedicines.fulfilled, (state, action) => {
          console.log('Payload:', action.payload); 
          state.loading = false;
          state.medicines = action.payload.products || []; 
          state.totalPages = Math.ceil(action.payload.total / state.limit);
          })
          .addCase(fetchMedicines.rejected, handleRejected)
      },});
  
      export const medicinesReducer = medicinesSlice.reducer;
      export const {
        setFilters,
        resetFilters,
        setPage,
        setLimit,
        setTotalPages
    } = medicinesSlice.actions;