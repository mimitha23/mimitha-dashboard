import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  color_ka: "",
  color_en: "",
  color_hex: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const createColorSlice = createSlice({
  name: "create-color",
  initialState,
  reducers: {
    setColor(state, { payload: { key, value } }) {
      state[key] = value;
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

    getAllColors: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state) {
      resetFormState(state);
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

export default createColorSlice.reducer;
export const createColorActions = createColorSlice.actions;

function resetFormState(state) {
  state.color_en = "";
  state.color_ka = "";
  state.color_hex = "";
}

function generatePreparationObject(payload) {
  return {
    hex: payload.color_hex,
    label: {
      ka: payload.color_ka,
      en: payload.color_en,
    },
  };
}
