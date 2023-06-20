import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  color_ka: "მწვანე",
  color_en: "green",
  color_hex: "#26e066",

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

    setSuccess(state) {
      state.status = status.success();
      state.color_en = "";
      state.color_ka = "";
      state.color_hex = "";
    },

    setError(state, { payload }) {
      console.log(payload);
      state.status = status.error();
    },
  },
});

export default createColorSlice.reducer;
export const { setColor, createColor, setSuccess, setError } =
  createColorSlice.actions;
