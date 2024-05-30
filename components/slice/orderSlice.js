import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchOrders(state, action) {
      state.orders = action.payload.orders;
      state.loading = false;
      state.error = null;
      // console.log(state.orders, 'state.orders at fetchOrders')
    },
    updateOrder: (state, action) => {
      const { orderId, isPaid, isDelivered } = action.payload;
      const orderInstance = state.orders.findIndex(
        (order) => order.id === orderId
      );
      // console.log(orderInstance, 'orderInstance at updateOrder')
      // console.log(state.orders, 'state.orders at updateOrder')
      if (orderInstance) {
        orderInstance.isPaid = isPaid;
        orderInstance.isDelivered = isDelivered;
      }
    },
    clearOrders(state) {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { updateOrder, clearOrders, fetchOrders } = orderSlice.actions;

export default orderSlice.reducer;
