import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  label_ka: "",
  label_en: "",
  query: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const createProductStyleSlice = createSlice({
  name: "create-product-style",
  initialState,
  reducers: {
    setProductStyle(state, { payload: { key, value } }) {
      state[key] = value;
    },

    createProductStyle: {
      prepare(payload) {
        return {
          payload: {
            query: payload.query.split(" ").join("_"),
            label: {
              ka: payload.label_ka,
              en: payload.label_en,
            },
          },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state, { payload }) {
      state.label_ka = "";
      state.label_en = "";
      state.query = "";
      state.status = status.success();
      alert(JSON.stringify(payload));
    },

    setError(state, { payload }) {
      state.status = status.error();
      alert(JSON.stringify(payload));
    },

    resetState(state) {
      state.label_ka = "";
      state.label_en = "";
      state.query = "";
      state.status = status.reset();
    },
  },
});

export default createProductStyleSlice.reducer;
export const createProductStyleActions = createProductStyleSlice.actions;
