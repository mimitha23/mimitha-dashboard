import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  form: {
    productTypes: {
      _id: "",
      caption: "",
    },
    gender: {
      _id: "",
      caption: "",
    },
    productStyles: [],
    seasons: [],
    warnings: [
      {
        _id: 1234,
        ka: "გაფრთხილება",
        en: "warning",
      },
    ],
    texture: [
      {
        _id: nanoid(),
        texture_ka: "ბამბაc",
        texture_en: "cottonწ",
        percentage: "",
      },
      // {
      //   _id: nanoid(),
      //   texture_ka: "ბამბა",
      //   texture_en: "cotton",
      //   percentage: "100n",
      // },
    ],
  },

  registerProductFormSugestions: {
    productStyles: [],
    seasons: [],
    gender: [],
    productTypes: [],
  },

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
     * this on sets only the primitive type values such as:
     * @param {object} { key: string, value: string }
     */
    setRegisterProductValue(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    setSelectable(state, { payload: { key, value } }) {
      const selectedValue = state.registerProductFormSugestions[key].find(
        (item) => item._id === value
      );

      if (!selectedValue) return;

      state.form[key] = selectedValue;
    },

    setMultipleSelectable(state, { payload: { key, value } }) {
      const selectedValue = state.registerProductFormSugestions[key].find(
        (item) => item._id === value
      );

      if (!selectedValue) return;

      const isSelectedValue = state.form[key].some(
        (item) => item._id === selectedValue._id
      );

      state.form[key] = isSelectedValue
        ? state.form[key].filter((v) => v._id !== selectedValue._id)
        : [{ ...selectedValue }, ...state.form[key]];
    },

    setTexture(state, { payload: { key, value, _id: textureId } }) {
      const activeTextureIndex = state.form.texture.findIndex(
        (texture) => texture._id === textureId
      );

      if (activeTextureIndex < 0) return;

      state.form.texture[activeTextureIndex][key] = value;
    },

    addTextureField(state) {
      const lastTexture = state.form.texture[state.form.texture.length - 1];
      const lastTextureFieldIsFilled =
        Object.values(lastTexture).filter(
          (fieldValue) => fieldValue.trim() !== ""
        ).length === Object.values(lastTexture).length;

      lastTextureFieldIsFilled &&
        state.form.texture.push({
          _id: nanoid(),
          texture_ka: "",
          texture_en: "",
          percentage: "",
        });
    },

    addWarning(state, { payload: { ka, en } }) {
      state.form.warnings.push({ _id: nanoid(), ka, en });
    },

    removeWarning(state, { payload: warningId }) {
      state.form.warnings = state.form.warnings.filter(
        (warning) => warning._id !== warningId
      );
    },

    updateWarning(state, { payload: { _id: warningId, value } }) {
      const warningIndex = state.form.warnings.findIndex(
        (warning) => warning._id === warningId
      );

      if (warningIndex < 0) return;

      state.form.warnings[warningIndex].ka = value.ka;
      state.form.warnings[warningIndex].en = value.en;
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

    getRegisterProductFormSugestions: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setRegisterProductFormSugestions(state, { payload }) {
      const editedSugestions = {};

      Object.keys(payload).forEach((key) => {
        const editedList = payload[key].map((item) => ({
          ...item,
          caption: item.ka,
        }));

        editedSugestions[key] = editedList;
      });

      state.registerProductFormSugestions = editedSugestions;
    },

    setSuccess(state, { payload }) {
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

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        // state.isUpdating = false;
        // state.updatingProductStyleId = "";
      }
    },
  },
});

export default registerProductSlice.reducer;
export const registerProductActions = registerProductSlice.actions;
