import { createSlice } from "@reduxjs/toolkit";

function calculateTotals(cartItems) {
  let totalQuantity = 0;
  let totalPrice = 0;

  Object.values(cartItems).forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  return { totalQuantity, totalPrice };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {},
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemId = item.id;

      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = {
          ...item,
          quantity: 1,
        };
      } else {
        state.cartItems[itemId].quantity++;
      }

      const totals = calculateTotals(state.cartItems);
      state.totalItems = totals.totalQuantity;
      state.totalAmount = totals.totalPrice;
    },

    removeFromCart: (state, action) => {
      delete state.cartItems[action.payload];

      const totals = calculateTotals(state.cartItems);
      state.totalItems = totals.totalQuantity;
      state.totalAmount = totals.totalPrice;
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems[itemId];
      if (item) {
        item.quantity += 1;
        const totals = calculateTotals(state.cartItems);
        state.totalItems = totals.totalQuantity;
        state.totalAmount = totals.totalPrice;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems[itemId];
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          delete state.cartItems[itemId];
        }
        const totals = calculateTotals(state.cartItems);
        state.totalItems = totals.totalQuantity;
        state.totalAmount = totals.totalPrice;
      }
    },
    fillCart: (state, action) => {
      state.cartItems = action.payload;
      const totals = calculateTotals(state.cartItems);
      state.totalItems = totals.totalQuantity;
      state.totalAmount = totals.totalPrice;
    },
    clearCart: (state) => {
      state.cartItems = {};
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  fillCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
