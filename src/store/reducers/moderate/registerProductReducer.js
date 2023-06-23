import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  productType: "",
  styles: [],
  seasons: [],
  gender: "",
  warnings: [],
  texture: [
    {
      _id: nanoid(),
      texture_ka: "",
      texture_en: "",
      percentage: "",
    },
  ],

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

    setTexture(state, { payload: { key, value, _id: textureId } }) {
      const activeTextureIndex = state.texture.findIndex(
        (texture) => texture._id === textureId
      );

      if (activeTextureIndex < 0) return;

      state.texture[activeTextureIndex][key] = value;
    },

    addTextureField(state) {
      const lastTexture = state.texture[state.texture.length - 1];
      const lastTextureFieldIsFilled =
        Object.values(lastTexture).filter(
          (fieldValue) => fieldValue.trim() !== ""
        ).length === Object.values(lastTexture).length;

      lastTextureFieldIsFilled &&
        state.texture.push({
          _id: nanoid(),
          texture_ka: "",
          texture_en: "",
          percentage: "",
        });
    },

    addWarning(state, { payload }) {
      state.warnings.push({
        _id: nanoid(),
        warning: payload,
      });
    },

    removeWarning(state, { payload: warningId }) {
      state.warnings = state.warnings.filter(
        (warning) => warning._id !== warningId
      );
    },

    updateWarning(state, { payload: { _id: warningId, value } }) {
      const warningIndex = state.warnings.findIndex(
        (warning) => warning._id === warningId
      );

      if (warningIndex < 0) return;

      state.warnings[warningIndex].warning = value;
    },

    // API
    registerProduct: {
      prepare(payload) {
        return {
          payload: {
            productType: payload.productType,
            styles: payload.styles,
          },
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
