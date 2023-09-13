import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";
import { convertBase64StrToFile } from "utils";

const initialState = {
  form: {
    variant_type: {
      _id: "",
      caption: "",
      label_ka: "",
      label_en: "",
    },
    label_ka: "",
    label_en: "",
    description_ka: "",
    description_en: "",
    icon: "",
    new_icon: "",
  },

  isUpdating: false,
  updatingVariantId: "",

  existingVariantTypes: [],
  allVariants: [],

  status: status.default(),
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
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
      prepare({ data }) {
        return {
          payload: prepareDataForDB({ data }),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setVariantDefaults(state, { payload }) {
      const form = {
        variant_type: { _id: nanoid(), caption: payload.type },
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
      prepare({ data, updatingVariantId }) {
        return {
          payload: prepareDataForDB({ data, updatingVariantId }),
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
    setStatusSuccess(state, { payload: stage }) {
      state.status = status.success(stage);
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

function prepareDataForDB({ data, updatingVariantId }) {
  const credentials = {
    data: {
      type: data.variant_type.caption,
      description_ka: data.description_ka,
      description_en: data.description_en,
      label_ka: data.label_ka,
      label_en: data.label_en,
    },
  };

  if (data.icon) credentials.data.icon = data.icon;
  if (data.new_icon) {
    const blob = convertBase64StrToFile({ base64Str: data.new_icon });
    credentials.data.media = blob;
  }

  if (updatingVariantId) credentials.updatingVariantId = updatingVariantId;
  return credentials;
}
