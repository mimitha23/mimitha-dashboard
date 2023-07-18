import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "../helpers";

const initialState = {
  form: {
    variantType: {
      ka: "",
      en: "",
      caption: "",
      _id: "",
    },
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
      state.form[key] = value;
    },

    setVariantType(state, { payload: value }) {
      state.form.variantType.caption = value;
    },

    selectVariantType(state, { payload: variant }) {
      if (variant === null) {
        state.form.variantType = initialState.form.variantType;
        return;
      }

      state.form.variantType = variant;
    },

    setIcon(state, { payload }) {
      state.form.newIcon = payload;
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
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setVariantDefaults(state, { payload }) {
      const form = {
        variantType: { _id: nanoid(), caption: payload.type },
        label_ka: payload.ka,
        label_en: payload.en,
        description: payload.description,
        icon: payload.icon,
      };

      state.form = form;

      state.isUpdating = true;
      state.updatingVariantId = payload._id;
    },

    updateVariant: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
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

    // REQUEST STATUS SETTERS
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

function prepareDataForDB(payload) {
  const credentials = {
    type: payload.variantType.caption,
    description: payload.description,
    ka: payload.label_ka,
    en: payload.label_en,
  };

  if (payload.icon) credentials.icon = payload.icon;
  if (payload.newIcon) credentials.media = payload.newIcon;

  if (payload.isUpdating && payload.updatingVariantId)
    credentials._id = payload.updatingVariantId;

  return credentials;
}
