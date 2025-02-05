import { createSlice } from "@reduxjs/toolkit";
import { fetchReviews } from "./operations";

const handlePending = (state) => {
   state.loading = true;
   state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.error.message;
};

const INITIAL_STATE = {
    reviews: [],
    loading: false,
    error: null,
};

  export const reviewsSlice = createSlice({
      name: "reviews",
      initialState: INITIAL_STATE,

        extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, handlePending)
            .addCase(fetchReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload; 
            })
            .addCase(fetchReviews.rejected, handleRejected)

        },});

    export const reviewsReducer = reviewsSlice.reducer;