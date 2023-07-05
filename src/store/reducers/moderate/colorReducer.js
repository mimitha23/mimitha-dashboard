import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

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

    setColorDefaults(state, { payload }) {
      state.form.color_ka = payload.label.ka;
      state.form.color_en = payload.label.en;
      state.form.color_hex = payload.hex;

      state.isUpdating = true;
      state.updatingColorId = payload._id;
    },

    // API
    createColor: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    updateColor: {
      prepare(payload) {
        return {
          payload: generatePreparationObject(payload),
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

function generatePreparationObject(payload) {
  const credentials = {
    hex: payload.color_hex,
    label: {
      ka: payload.color_ka,
      en: payload.color_en,
    },
  };

  if (payload.updatingColorId) credentials._id = payload.updatingColorId;

  return credentials;
}
