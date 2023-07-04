import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
    query: "",
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
  name: "create-product-style",
  initialState,
  reducers: {
    setProductStyle(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    setProductStyleDefaults(state, { payload }) {
      state.form.label_ka = payload.ka;
      state.form.label_en = payload.en;
      state.form.query = payload.query.replaceAll("_", " ");

      state.isUpdating = true;
      state.updatingProductStyleId = payload._id;
    },

    // API
    createProductStyle: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    updateProductStyle: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
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
      console.log(payload);
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

function generatePreparationObject(payload) {
  const credentials = {
    query: payload.query.split(" ").join("_"),
    ka: payload.label_ka,
    en: payload.label_en,
  };

  if (payload.isUpdating && payload.updatingProductStyleId)
    credentials._id = payload.updatingProductStyleId;

  return credentials;
}
