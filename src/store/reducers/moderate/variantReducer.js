import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  variantType: "",
  label_ka: "",
  label_en: "",
  description: "",
  icon: null,

  existingVariantTypes: [],
  allVariants: [],

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const variantSlice = createSlice({
  name: "create-variant",
  initialState,
  reducers: {
    setVariant(state, { payload: { key, value } }) {
      state[key] = value;
    },

    // API
    getExistingVariantTypes: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setExistingVariantTypes(state, { payload }) {
      state.existingVariantTypes = payload.map((type) => ({
        _id: nanoid(),
        caption: type,
      }));
    },

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

    setAllVariants(state, { payload }) {
      state.allVariants = payload;
    },

    setSuccess(state) {
      resetFormState(state);
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

export default variantSlice.reducer;
export const variantActions = variantSlice.actions;

function resetFormState(state) {
  state.variantType = "";
  state.description = "";
  state.label_ka = "";
  state.label_en = "";
  state.icon = null;
}

function generatePreparationObject(payload) {
  return {
    type: payload.variantType,
    description: payload.description,
    icon: payload.icon,
    label: {
      ka: payload.label_ka,
      en: payload.label_en,
    },
  };
}
