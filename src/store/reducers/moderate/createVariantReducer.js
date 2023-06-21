import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  variantType: "",
  label_ka: "",
  label_en: "",
  description: "",
  icon: null,

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
            icon: payload.icon,
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
      state.variantType = "";
      state.description = "";
      state.label_ka = "";
      state.label_en = "";
      state.icon = null;
      state.status = status.success();
      alert(JSON.stringify(payload));
    },

    setError(state, { payload }) {
      alert(JSON.stringify(payload));
      state.status = status.error();
    },

    resetState(state) {
      state.status = status.reset();
      state.variantType = "";
      state.description = "";
      state.label_ka = "";
      state.label_en = "";
      state.icon = null;
    },
  },
});

export default createVariantSlice.reducer;
export const createVariantActions = createVariantSlice.actions;
