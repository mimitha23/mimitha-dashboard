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

    // API
    createVariant: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    updateVariant: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteVariant: {
      prepare(payload) {
        return {
          payload: { _id: payload },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    getAllVariants: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state) {
      resetFormState();
      state.status = status.success();
    },

    setError(state, { payload }) {
      state.status = status.error();
    },

    resetState(state) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export default createVariantSlice.reducer;
export const createVariantActions = createVariantSlice.actions;

function resetFormState(state) {
  state.variantType = "";
  state.description = "";
  state.label_ka = "";
  state.label_en = "";
  state.icon = null;
}

function generatePreparationObject(payload) {
  return {
    variantType: payload.variantType,
    description: payload.description,
    icon: payload.icon,
    label: {
      ka: payload.label_ka,
      en: payload.label_en,
    },
  };
}
