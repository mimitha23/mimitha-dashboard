import {
  createQueryStr,
  controlStatus as status,
} from "store/reducers/helpers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
  },

  allProductStyles: [],

  isUpdating: false,
  updatingProductStyleId: "",

  status: status.default(),
};

const productStyleSlice = createSlice({
  name: "product-style",
  initialState,
  reducers: {
    // API
    createProductStyle: {
      prepare({ data }) {
        return {
          payload: prepareDataForDB({ data }),
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
      prepare({ data, updatingProductStyleId }) {
        return {
          payload: prepareDataForDB({ data, updatingProductStyleId }),
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
    setStatusSuccess(state, { payload }) {
      state.status = status.success(payload);
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

function prepareDataForDB({ data, updatingProductStyleId }) {
  const credentials = {
    data: {
      ka: data.label_ka,
      en: data.label_en,
      query: createQueryStr(data.label_ka),
    },
  };

  if (updatingProductStyleId)
    credentials.updatingProductStyleId = updatingProductStyleId;

  return credentials;
}
