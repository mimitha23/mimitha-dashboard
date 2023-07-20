import {
  controlStatus as status,
  createQueryStr,
} from "store/reducers/helpers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
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

    // API
    createProductType: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setProductTypeDefaults(state, { payload }) {
      const form = {
        label_ka: payload.ka,
        label_en: payload.en,
      };

      state.form = form;

      state.isUpdating = true;
      state.updatingProductTypeId = payload._id;
    },

    updateProductType: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
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

function prepareDataForDB(payload) {
  const credentials = {
    ka: payload.label_ka,
    en: payload.label_en,
    query: createQueryStr(payload.label_en),
  };

  if (payload.isUpdating && payload.updatingProductTypeId)
    credentials._id = payload.updatingProductTypeId;

  return credentials;
}
