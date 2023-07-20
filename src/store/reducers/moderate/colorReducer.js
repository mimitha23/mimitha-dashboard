import { createSlice } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  form: {
    color_ka: "",
    color_en: "",
    color_hex: "",
  },

  allColors: [],

  isUpdating: false,
  updatingColorId: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    // API
    createColor: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setColorDefaults(state, { payload }) {
      const form = {
        color_ka: payload.ka,
        color_en: payload.en,
        color_hex: payload.hex,
      };

      state.form = form;

      state.isUpdating = true;
      state.updatingColorId = payload._id;
    },

    updateColor: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteColor: {
      prepare(payload) {
        return {
          payload: { _id: payload },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedColor(state, { payload }) {
      state.allColors = state.allColors.filter(
        (color) => color._id !== payload
      );
    },

    getAllColors: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllColors(state, { payload }) {
      state.allColors = payload;
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

    resetAllColors(state) {
      state.allColors = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingColorId = "";
      }
    },
  },
});

export default colorSlice.reducer;
export const colorActions = colorSlice.actions;

function prepareDataForDB(payload) {
  const credentials = {
    ka: payload.color_ka,
    en: payload.color_en,
    hex: payload.color_hex,
  };

  if (payload.updatingColorId) credentials._id = payload.updatingColorId;

  return credentials;
}
