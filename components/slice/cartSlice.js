import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalItems: 0,
        totalAmount: 0,
    } ,
    reducers: {
        addToCart: (state, action) => {
            console.log(action, 'slice hey') 
          const existingItem = state.cartItems.find(
            (item) => item.id === action.payload.id
          );
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            state.cartItems.push({ ...action.payload, quantity: 1 });
          }
        totalItems: state.totalItems += 1;
        totalAmount: state.totalAmount += action.payload.price;
        },

        removeFromCart: (state, action) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        totalItems: state.totalItems -= 1;
        totalAmount: state.totalAmount -= action.payload.price;
        },
        increaseQuantity: (state, action) => {
          const item = state.cartItems.find((item) => item.id === action.payload);
          if (item) {
            item.quantity += 1;
          }
          totalItems: state.totalItems += 1;
            totalAmount: state.totalAmount += item.price;
        },
        decreaseQuantity: (state, action) => {
          const item = state.cartItems.find((item) => item.id === action.payload);
          if (item && item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
          }
            totalItems: state.totalItems -= 1;
            totalAmount: state.totalAmount -= item.price;
        },

      },
    });
    
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =cartSlice.actions;
export default cartSlice.reducer;