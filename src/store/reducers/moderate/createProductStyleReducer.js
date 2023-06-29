import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  label_ka: "",
  label_en: "",
  query: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const createProductStyleSlice = createSlice({
  name: "create-product-style",
  initialState,
  reducers: {
    setProductStyle(state, { payload: { key, value } }) {
      state[key] = value;
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

    getAllProductStyles: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state) {
      resetFormState();
      state.status = status.success();
    },

    setError(state, { payload }) {
      state.status = status.error();
    },

    resetState(state) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export default createProductStyleSlice.reducer;
export const createProductStyleActions = createProductStyleSlice.actions;

function resetFormState(state) {
  state.label_ka = "";
  state.label_en = "";
  state.query = "";
}

function generatePreparationObject(payload) {
  return {
    query: payload.query.split(" ").join("_"),
    label: {
      ka: payload.label_ka,
      en: payload.label_en,
    },
  };
}
