import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    const categories = data.map(category => {
        const id = category.replace(/[']/g, "").replace(/(?<=\s+)[a-z]/gi, (char) => char.toUpperCase()).replace(/\s/g, "").toLowerCase()
        const title = category.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        return { id, title };
        });
    return categories;

  } catch (error) {
    throw error; 
  }
});

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categorySlice.reducer;
