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

    createColor: {
      prepare(payload) {
        return {
          payload: {
            color: payload.color_hex,
            label: {
              ka: payload.color_ka,
              en: payload.color_en,
            },
          },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state, { payload }) {
      state.color_en = "";
      state.color_ka = "";
      state.color_hex = "";
      state.status = status.success();
      alert(JSON.stringify(payload));
    },

    setError(state, { payload }) {
      state.status = status.error();
      alert(JSON.stringify(payload));
    },

    resetState(state) {
      state.color_en = "";
      state.color_ka = "";
      state.color_hex = "";
      state.status = status.reset();
    },
  },
});

export default createColorSlice.reducer;
export const createColorActions = createColorSlice.actions;
