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

  status: status.default(),
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    // API
    createColor: {
      prepare({ data }) {
        return {
          payload: prepareDataForDB({ data }),
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
      prepare({ data, updatingColorId }) {
        return {
          payload: prepareDataForDB({ data, updatingColorId }),
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

function prepareDataForDB({ data, updatingColorId }) {
  const credentials = {
    data: {
      ka: data.color_ka,
      en: data.color_en,
      hex: data.color_hex,
    },
  };

  if (updatingColorId) credentials.updatingColorId = updatingColorId;

  return credentials;
}
