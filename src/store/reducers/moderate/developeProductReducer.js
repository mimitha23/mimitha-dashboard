import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const developeProductSlice = createSlice({
  name: "developed-products",
  initialState,
  reducers: {
    setDevelopedProduct(state, { payload: { key, value } }) {
      state[key] = value;
    },

    createDevelopedProduct: {
      prepare(payload) {
        return {
          payload: {},
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state, { payload }) {
      state.status = status.success();
      alert(JSON.stringify(payload));
    },

    setError(state, { payload }) {
      alert(JSON.stringify(payload));
      state.status = status.error();
    },

    resetState(state) {
      state.status = status.reset();
    },
  },
});

export default developeProductSlice.reducer;
export const developeProductActions = developeProductSlice.actions;
