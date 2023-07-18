import { createSlice } from "@reduxjs/toolkit";
import { controlStatus as status } from "../helpers";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
  },

  allProductStyles: [],

  isUpdating: false,
  updatingProductStyleId: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const productStyleSlice = createSlice({
  name: "product-style",
  initialState,
  reducers: {
    setProductStyle(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    // API
    createProductStyle: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setProductStyleDefaults(state, { payload }) {
      const form = {
        label_ka: payload.ka,
        label_en: payload.en,
      };

      state.form = form;

      state.isUpdating = true;
      state.updatingProductStyleId = payload._id;
    },

    updateProductStyle: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteProductStyle: {
      prepare(payload) {
        return {
          payload: { _id: payload },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedProductStyle(state, { payload }) {
      state.allProductStyles = state.allProductStyles.filter(
        (style) => style._id !== payload
      );
    },

    getAllProductStyles: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllProductStyles(state, { payload }) {
      state.allProductStyles = payload;
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

    resetAllProductStyles(state) {
      state.allProductStyles = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingProductStyleId = "";
      }
    },
  },
});

export default productStyleSlice.reducer;
export const productStyleActions = productStyleSlice.actions;

function prepareDataForDB(payload) {
  const credentials = {
    ka: payload.label_ka,
    en: payload.label_en,
    query: payload.label_en.split(" ").join("_"),
  };

  if (payload.isUpdating && payload.updatingProductStyleId)
    credentials._id = payload.updatingProductStyleId;

  return credentials;
}
