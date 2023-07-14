import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "./helpers";

const initialState = {
  form: {
    email: "",
    password: "",
  },

  status: {
    loading: false,
    error: false,
    message: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthForm(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    login: {
      prepare(paylaod) {
        return {
          payload: {},
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    resetForm(state) {
      state.form = initialState.form;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
