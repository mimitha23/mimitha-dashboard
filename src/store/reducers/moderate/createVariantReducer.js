import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  variantType: "",
  label_ka: "",
  label_en: "",
  description: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const createVariantSlice = createSlice({
  name: "create-variant",
  initialState,
  reducers: {
    setVariant(state, { payload: { key, value } }) {
      state[key] = value;
    },

    createVariant: {
      prepare(payload) {
        return {
          payload: {
            variantType: payload.variantType,
            description: payload.description,
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

    setSuccess(state) {
      state.status = status.success();
      state.variantType = "";
      state.description = "";
      state.label_ka = "";
      state.label_en = "";
    },

    setError(state, { payload }) {
      state.status = status.error();
    },

    resetState(state) {
      state.status = status.reset();
      state.variantType = "";
      state.description = "";
      state.label_ka = "";
      state.label_en = "";
    },
  },
});

export default createVariantSlice.reducer;
export const { setVariant, createVariant, setSuccess, setError, resetState } =
  createVariantSlice.actions;
