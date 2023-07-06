import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
    query: "",
  },

  allProductTypes: [],

  isUpdating: false,
  updatingProductTypeId: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const productTypeSlice = createSlice({
  name: "product-type",
  initialState,
  reducers: {
    setProductType(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    setProductTypeDefaults(state, { payload }) {
      state.form.label_ka = payload.ka;
      state.form.label_en = payload.en;
      state.form.query = payload.query.replaceAll("_", " ");

      state.isUpdating = true;
      state.updatingProductTypeId = payload._id;
    },

    // API
    createProductType: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    updateProductType: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteProductType: {
      prepare(payload) {
        return {
          payload: { _id: payload },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedProductType(state, { payload }) {
      state.allProductTypes = state.allProductTypes.filter(
        (type) => type._id !== payload
      );
    },

    getAllProductTypes: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllProductTypes(state, { payload }) {
      state.allProductTypes = payload;
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

    resetAllProductTypes(state) {
      state.allProductTypes = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingProductTypeId = "";
      }
    },
  },
});

export default productTypeSlice.reducer;
export const productTypeActions = productTypeSlice.actions;

function generatePreparationObject(payload) {
  const credentials = {
    query: payload.query.split(" ").join("_"),
    ka: payload.label_ka,
    en: payload.label_en,
  };

  if (payload.isUpdating && payload.updatingProductTypeId)
    credentials._id = payload.updatingProductTypeId;

  return credentials;
}
