import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  productType: "",
  styles: [],
  seasons: [],
  gender: "",
  texture: [
    {
      _id: nanoid(),
      name__ka: "",
      name__en: "",
      percentage: "",
    },
  ],
  warnings: [],
  tags: [],

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const registerProductSlice = createSlice({
  name: "registered-products",
  initialState,
  reducers: {
    /**
     * this on sets only the primitive type values such as: productType and gender
     * @param {object} { key: string, value: string }
     */
    setRegisterProductValue(state, { payload: { key, value } }) {
      state[key] = value;
    },

    setSeason(state, { payload }) {
      const isSelectedValue = state.seasons.includes(payload);

      state.seasons = isSelectedValue
        ? state.seasons.filter((v) => v !== payload)
        : [payload, ...state.seasons];
    },

    setStyle(state, { payload }) {
      const isSelectedValue = state.styles.includes(payload);

      state.styles = isSelectedValue
        ? state.styles.filter((v) => v !== payload)
        : [payload, ...state.styles];
    },

    setTexture(state, { payload: { key, value, _id } }) {
      console.log({ key, value, _id });
    },

    // API
    registerProduct: {
      prepare(payload) {
        return {
          payload: {},
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setSuccess(state, { payload }) {
      state.status = status.success();
      alert(JSON.stringify(payload));
    },

    setError(state, { payload }) {
      alert(JSON.stringify(payload));
      state.status = status.error();
    },

    resetState(state) {
      state.status = status.reset();
    },
  },
});

export default registerProductSlice.reducer;
export const registerProductActions = registerProductSlice.actions;
