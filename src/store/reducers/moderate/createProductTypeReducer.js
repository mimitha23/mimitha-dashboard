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

const createProductTypeSlice = createSlice({
  name: "create-product-type",
  initialState,
  reducers: {
    setProductType(state, { payload: { key, value } }) {
      state[key] = value;
    },

    createProductType: {
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
      alert(JSON.stringify(payload));
      state.status = status.error();
    },

    resetState(state) {
      state.label_ka = "";
      state.label_en = "";
      state.query = "";
      state.status = status.reset();
    },
  },
});

export default createProductTypeSlice.reducer;
export const createProductTypeActions = createProductTypeSlice.actions;
