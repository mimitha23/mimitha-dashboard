import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  form: {
    variantType: {
      label_ka: "",
      label_en: "",
      caption: "",
      _id: "",
    },
    label_ka: "",
    label_en: "",
    description_ka: "",
    description_en: "",
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
    setVariantType(state, { payload: value }) {
      state.form.variantType.caption = value;
    },

    selectVariantType(state, { payload: variant }) {
      if (variant === null) {
        state.form.variantType = initialState.form.variantType;
        return;
      }

      state.form.variantType = variant;

      if (variant._id && variant.label_ka && variant.label_en) {
        state.form.label_en = variant.label_en;
        state.form.label_ka = variant.label_ka;
      }
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
        _id: type._id,
        caption: type.type,
        label_ka: type.label_ka,
        label_en: type.label_en,
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
        label_ka: payload.label_ka,
        label_en: payload.label_en,
        description_ka: payload.description_ka,
        description_en: payload.description_en,
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
      state.status = status.error(payload.message);
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
    description_ka: payload.description_ka,
    description_en: payload.description_en,
    label_ka: payload.label_ka,
    label_en: payload.label_en,
  };

  if (payload.icon) credentials.icon = payload.icon;
  if (payload.newIcon) credentials.media = payload.newIcon;

  if (payload.isUpdating && payload.updatingVariantId)
    credentials._id = payload.updatingVariantId;

  return credentials;
}
