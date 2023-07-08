import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  form: {
    isEditable: null,
    productTypes: null,
    gender: null,
    productStyles: [],
    seasons: [],
    warning: {
      warning_ka: "",
      warning_en: "",
    },
    warnings: [],
    textures: [
      {
        _id: nanoid(),
        textures: null,
        percentage: "",
      },
    ],
    thumbnail: "",
    newThumbnail: "",
  },

  allRegisteredProducts: [],

  isUpdating: false,
  updatingRegisteredProductId: "",

  registerProductFormSugestions: {
    productStyles: [],
    seasons: [],
    gender: [],
    productTypes: [],
    textures: [],
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

    setIsEditable(state, { payload }) {
      state.form.isEditable = payload;
    },

    setTexture(state, { payload: { key, value, _id: textureId } }) {
      const activeTextureIndex = state.form.textures.findIndex(
        (texture) => texture._id === textureId
      );

      if (activeTextureIndex < 0) return;

      const valueToAssign =
        key === "percentage"
          ? value
          : state.registerProductFormSugestions.textures.find(
              (texture) => texture._id === value
            );

      state.form.textures[activeTextureIndex][key] = valueToAssign;
    },

    addTextureField(state) {
      const lastTexture = [...state.form.textures].pop();

      const lastTextureFieldIsFilled =
        Object.values(lastTexture).filter(
          (fieldValue) =>
            (typeof fieldValue === "string" && fieldValue.trim() !== "") ||
            (typeof fieldValue === "object" && fieldValue !== null)
        ).length === Object.values(lastTexture).length;

      lastTextureFieldIsFilled &&
        state.form.textures.push({
          _id: nanoid(),
          textures: null,
          percentage: "",
        });
    },

    setWarning(state, { payload: { key, value } }) {
      state.form.warning[key] = value;
    },

    updateWarning(state, { payload: warningId }) {
      const warningIndex = state.form.warnings.findIndex(
        (warning) => warning._id === warningId
      );

      if (warningIndex < 0) return;

      state.form.warning.warning_ka = state.form.warnings[warningIndex].ka;
      state.form.warning.warning_en = state.form.warnings[warningIndex].en;
    },

    setUpdatedWarning(state, { payload: warningId }) {
      const warningIndex = state.form.warnings.findIndex(
        (warning) => warning._id === warningId
      );

      if (warningIndex < 0) return;

      state.form.warnings[warningIndex] = {
        ...state.form.warnings[warningIndex],
        ka: state.form.warning.warning_ka,
        en: state.form.warning.warning_en,
      };

      state.form.warning = initialState.form.warning;
    },

    addWarning(state) {
      const lastTextureFieldIsFilled = Object.values(state.form.warning).every(
        (fieldValue) =>
          typeof fieldValue === "string" && fieldValue.trim() !== ""
      );

      if (!lastTextureFieldIsFilled) return;

      state.form.warnings.push({
        _id: nanoid(),
        ka: state.form.warning.warning_ka,
        en: state.form.warning.warning_en,
      });

      state.form.warning = initialState.form.warning;
    },

    removeWarning(state, { payload: warningId }) {
      state.form.warnings = state.form.warnings.filter(
        (warning) => warning._id !== warningId
      );
    },

    // API
    registerProduct: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setRegisteredProductDefaults(state, { payload }) {
      console.log({ payload });
      const form = {
        productTypes: null,
        gender: null,
        productStyles: [],
        seasons: [],
        warning: {
          warning_ka: "",
          warning_en: "",
        },
        warnings: [],
        textures: [
          {
            _id: nanoid(),
            textures: null,
            percentage: "",
          },
        ],
      };
    },

    updateRegisteredProduct: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteRegisteredProduct: {
      prepare(payload) {
        return {
          payload: { _id: payload },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedRegisteredProduct(state, { payload }) {
      state.allRegisteredProducts = state.allRegisteredProducts.filter(
        (product) => product._id !== payload
      );
    },

    getAllRegisteredProducts: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllRegisteredProducts(state, { payload }) {
      state.allRegisteredProducts = payload;
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

    resetAllProducts(state) {
      state.allRegisteredProducts = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingRegisteredProductId = "";
      }
    },
  },
});

export default registerProductSlice.reducer;
export const registerProductActions = registerProductSlice.actions;

function prepareDataForDB(payload) {
  const credentials = {
    productType: {
      query: payload.productTypes.query,
      ka: payload.productTypes.ka,
      en: payload.productTypes.en,
    },
    styles: payload.productStyles.map((style) => ({
      query: style.query,
      ka: style.ka,
      en: style.en,
    })),
    seasons: payload.seasons.map((season) => ({
      ka: season.ka,
      en: season.en,
      query: season.query,
    })),
    gender: {
      query: payload.gender.query,
      ka: payload.gender.ka,
      en: payload.gender.en,
    },
    textures: payload.textures.map((texture) => ({
      percentage: texture.percentage,
      ka: texture.textures.ka,
      en: texture.textures.ka,
    })),
    warnings: payload.warnings.map((warning) => ({
      ka: warning.ka,
      en: warning.en,
    })),
  };

  if (payload.isUpdating && payload.updatingRegisteredProductId)
    credentials._id = payload.updatingRegisteredProductId;

  return credentials;
}
