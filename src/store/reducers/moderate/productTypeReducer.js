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

  status: status.default(),
};

const productTypeSlice = createSlice({
  name: "product-type",
  initialState,
  reducers: {
    // API
    createProductType: {
      prepare({ data }) {
        return {
          payload: prepareDataForDB({ data }),
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
      prepare({ data, updatingProductTypeId }) {
        return {
          payload: prepareDataForDB({ data, updatingProductTypeId }),
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

function prepareDataForDB({ data, updatingProductTypeId }) {
  const credentials = {
    data: {
      ka: data.label_ka,
      en: data.label_en,
      query: createQueryStr(data.label_en),
    },
  };

  if (updatingProductTypeId)
    credentials.updatingProductTypeId = updatingProductTypeId;

  return credentials;
}
