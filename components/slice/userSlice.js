// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  user: null,
  name: null,
  status: "idle",
  error: null,
  token: null,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.token = action.payload.token;
      state.name = action.payload.name;
    },
    logoutUser(state) {
      state.user = null;
      state.name = null;
      state.token = null;
    },
    updateUser(state, action) {
      console.log("UpdateUser:", action.payload);
      state.name = action.payload.name;
    },
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser, updateUser } = userSlice.actions;
