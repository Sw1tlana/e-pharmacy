export const selectMedicine = (state) => state.medicines.medicines;

export const selectLoading = (state) => state.medicines.loading;

export const selectError = (state) => state.medicines.error;

export const selectTotalPages = (state) => state.medicines.totalPages;

export const selectPage = (state) => state.medicines.page || 1;

export const selectFilters = (state) => state.medicines.filters|| {};

export const selectLimit = (state) => state.medicines.limit || 12;

export const selectProduct = (state) => state.medicines.product;

export const selectSearchQuery = (state) => state.medicines.searchQuery || ''; 

export const selectSelectedCategory = (state) => state.medicines.selectedCategory || null;
