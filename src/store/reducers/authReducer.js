import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    login(state, { payload }) {},
  },
});

export default authSlice.reducer;
export const { login } = authSlice.actions;
