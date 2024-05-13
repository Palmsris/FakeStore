import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
   products: [],
   isLoading: false,
   selectedProduct: null,
   error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
   const response = await fetch('https://fakestoreapi.com/products');
   return response.json();
});

const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
     startLoading: (state) => {
       state.isLoading = true;
     },
     setProducts: (state, action) => {
       state.products = action.payload;
       state.isLoading = false;
       state.error = null;
     },
     setProductDetail: (state, action) => {
       state.selectedProduct = action.payload;
     },
     setError: (state, action) => {
       state.isLoading = false;
       state.error = action.payload;
     },
   },
   extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },

});

export const { startLoading, setProducts, setProductDetail, setError } = productSlice.actions;
export default productSlice.reducer;
