import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  form: {
    variantType: "",
    label_ka: "",
    label_en: "",
    description: "",
    icon: null,
    newIcon: null,
  },

  isUpdating: false,
  updatingVariantId: "",

  existingVariantTypes: [],
  allVariants: [],

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    setVariant(state, { payload: { key, value } }) {
      if (!state.isUpdating || (state.isUpdating && key !== "icon"))
        state.form[key] = value;
      else state.form.newIcon = value;
    },

    setVariantDefaults(state, { payload }) {
      state.form.variantType = payload.type;
      state.form.label_ka = payload.label.ka;
      state.form.label_en = payload.label.en;
      state.form.description = payload.description;
      state.form.icon = payload.icon;

      state.isUpdating = true;
      state.updatingVariantId = payload._id;
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

    setDeletedVariant(state, { payload }) {
      state.allVariants = state.allVariants.filter(
        (variant) => variant._id !== payload
      );
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
      state.status = status.success();
    },

    setError(state, { payload }) {
      state.status = status.error();
    },

    // RESET
    resetState(state) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },

    resetAllVariants(state) {
      state.allVariants = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingVariantId = "";
      }
    },
  },
});

export default variantSlice.reducer;
export const variantActions = variantSlice.actions;

function generatePreparationObject(payload) {
  const credentials = {
    type: payload.variantType,
    description: payload.description,
    icon: payload.icon,
    label: {
      ka: payload.label_ka,
      en: payload.label_en,
    },
  };

  if (payload.isUpdating && payload.newIcon)
    credentials.newIcon = payload.newIcon;
  if (payload.isUpdating && payload.updatingVariantId)
    credentials._id = payload.updatingVariantId;

  return credentials;
}
