import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  form: {
    isEditable: false,
    productTypes: {
      _id: "",
      ka: "",
      en: "",
      query: "",
      caption: "",
    },
    gender: {
      _id: "",
      ka: "",
      en: "",
      query: "",
      caption: "",
    },
    category: {
      _id: "",
      ka: "",
      en: "",
      query: "",
      caption: "",
    },
    productStyles: [],
    seasons: [],
    textures: [
      {
        _id: nanoid(),
        textures: {
          ka: "",
          en: "",
          caption: "",
        },
        percentage: "",
      },
    ],
    warning: {
      warning_ka: "",
      warning_en: "",
    },
    warnings: [],
    thumbnail: "",
    newThumbnail: null,
  },

  allRegisteredProducts: [],

  isUpdating: false,
  updatingRegisteredProductId: "",

  registerProductFormSuggestions: {
    productStyles: [],
    seasons: [],
    gender: [],
    productTypes: [],
    textures: [],
    categories: [],
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
    // warning actions
    setWarning(state, { payload: { key, value } }) {
      state.form.warning[key] = value;
    },

    addWarning(state) {
      // check if all warning fields is filled, otherwise don't let add new
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

      // check if all warning fields is filled, otherwise don't let add new
      const lastTextureFieldIsFilled = Object.values(state.form.warning).every(
        (fieldValue) =>
          typeof fieldValue === "string" && fieldValue.trim() !== ""
      );

      if (!lastTextureFieldIsFilled) return;

      state.form.warnings[warningIndex] = {
        ...state.form.warnings[warningIndex],
        ka: state.form.warning.warning_ka,
        en: state.form.warning.warning_en,
      };

      state.form.warning = initialState.form.warning;
    },

    removeWarning(state, { payload: warningId }) {
      state.form.warnings = state.form.warnings.filter(
        (warning) => warning._id !== warningId
      );
    },

    // thumbnail
    setThumbnail(state, { payload }) {
      state.form.newThumbnail = payload;
    },

    // API
    registerProduct: {
      prepare({ data }) {
        return {
          payload: prepareDataForDB({ data }),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setRegisteredProductDefaults(state, { payload }) {
      const form = {
        ...initialState.form,
        productTypes: {
          ...payload.productType,
          caption: payload.productType.ka,
        },
        gender: {
          ...payload.productType,
          caption: payload.gender.ka,
        },
        thumbnail: payload.thumbnail,
        productStyles: payload.styles.map((style) => ({
          ...style,
          caption: style.ka,
        })),
        seasons: payload.seasons.map((season) => ({
          ...season,
          caption: season.ka,
        })),
        textures: payload.textures.map((texture) => ({
          _id: nanoid(),
          percentage: texture.percentage,
          textures: {
            _id: texture._id,
            ka: texture.ka,
            en: texture.en,
            caption: texture.ka,
          },
        })),
        warnings: payload.warnings,
        isEditable: payload.isEditable,
      };

      state.isUpdating = true;
      state.updatingRegisteredProductId = payload._id;

      state.form = { ...form };
    },

    updateRegisteredProduct: {
      prepare({ data, updatingRegisteredProductId }) {
        return {
          payload: prepareDataForDB({ data, updatingRegisteredProductId }),
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

    getRegisterProductFormSuggestions: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setRegisterProductFormSuggestions(state, { payload }) {
      const editedSuggestions = {};

      Object.keys(payload).forEach((key) => {
        const editedList = payload[key].map((item) => ({
          ...item,
          caption: item.ka,
        }));

        editedSuggestions[key] = editedList;
      });

      state.registerProductFormSuggestions = editedSuggestions;
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

function prepareDataForDB({ data, updatingRegisteredProductId }) {
  const credentials = {
    data: {
      isEditable: data.isEditable,
      productType: {
        ka: data.productTypes.ka,
        en: data.productTypes.en,
        query: data.productTypes.query,
        _id: data.productTypes._id,
      },
      gender: {
        query: data.gender.query,
        ka: data.gender.ka,
        en: data.gender.en,
      },
      category: {
        query: data.category.query,
        ka: data.category.ka,
        en: data.category.en,
        _id: data.category._id,
      },
      styles: data.productStyles.map((style) => ({
        query: style.query,
        ka: style.ka,
        en: style.en,
        _id: style._id,
      })),
      seasons: data.seasons.map((season) => ({
        ka: season.ka,
        en: season.en,
        query: season.query,
        _id: season._id,
      })),
      textures: data.textures.map((texture) => ({
        percentage: texture.percentage,
        ka: texture.textures.ka,
        en: texture.textures.en,
        _id: texture.textures._id,
      })),
      warnings: data.warnings.map((warning) => ({
        ka: warning.ka,
        en: warning.en,
      })),
    },
  };

  if (data.thumbnail) credentials.data.thumbnail = data.thumbnail;
  if (data.newThumbnail) credentials.data.media = data.newThumbnail;

  if (updatingRegisteredProductId)
    credentials.updatingRegisteredProductId = updatingRegisteredProductId;

  return credentials;
}
