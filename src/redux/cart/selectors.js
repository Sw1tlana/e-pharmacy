export const selectItems = (state) => state.cart.items;

export const selectLoading = (state) => state.cart.loading;

export const selectError = (state) => state.cart.error;

export const selectPaymentMethod = (state) => state.cart.paymentMethod;

export const selectUpdateQuantity = (state) => state.cart.updateQuantity;

export const selectCheckout = (state) => state.cart.checkout;

export const selectTotalAmount = (state) => 
    state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);


