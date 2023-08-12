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
    // productType and gender
    setSelectable(state, { payload: { key, value } }) {
      state.form[key].caption = value;
    },

    selectSelectable(state, { payload: { key, value } }) {
      if (value === null) {
        state.form[key] = initialState.form[key];
        return;
      }

      state.form[key] = value;
    },

    // season and style
    setMultipleSelectable(state, { payload: { key, value } }) {
      // console.log({ key, value });
      const selectedValue = state.registerProductFormSuggestions[key].find(
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

    // isEditable
    setIsEditable(state, { payload }) {
      state.form.isEditable = payload;
    },

    // texture actions
    setTexture(state, { payload: { key, value, fieldId } }) {
      const activeFieldIndex = state.form.textures.findIndex(
        (texture) => texture._id === fieldId
      );

      if (activeFieldIndex < 0) return;

      if (key === "percentage") {
        state.form.textures[activeFieldIndex].percentage = value;
      } else if (key === "textures") {
        state.form.textures[activeFieldIndex].textures.caption = value;
      }
    },

    selectTexture(state, { payload: { value: texture, fieldId } }) {
      if (texture === null) {
        state.form.textures = initialState.form.textures;
        return;
      }

      const activeFieldIndex = state.form.textures.findIndex(
        (field) => field._id === fieldId
      );

      if (activeFieldIndex < 0) return;

      state.form.textures[activeFieldIndex].textures = texture;
    },

    addTextureField(state) {
      const lastTexture = [...state.form.textures].pop();

      // check if last field is filled, otherwise don't let add new field
      const lastTextureFieldIsFilled =
        Object.values(lastTexture).filter(
          (fieldValue) =>
            (typeof fieldValue === "string" && fieldValue.trim() !== "") ||
            (typeof fieldValue === "object" && fieldValue !== null)
        ).length === Object.values(lastTexture).length;

      lastTextureFieldIsFilled &&
        state.form.textures.push({
          ...initialState.form.textures[0],
          _id: nanoid(),
        });
    },

    removeTextureField(state, { payload }) {
      state.form.textures = state.form.textures.filter(
        (texture) => texture._id !== payload
      );
    },

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
    setSuccess(state) {
      state.status = status.success();
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

function prepareDataForDB(payload) {
  const credentials = {
    isEditable: payload.isEditable,
    productType: {
      query: payload.productTypes.query,
      ka: payload.productTypes.ka,
      en: payload.productTypes.en,
      _id: payload.productTypes._id,
    },
    category: {
      query: payload.category.query,
      ka: payload.category.ka,
      en: payload.category.en,
      _id: payload.category._id,
    },
    styles: payload.productStyles.map((style) => ({
      query: style.query,
      ka: style.ka,
      en: style.en,
      _id: style._id,
    })),
    seasons: payload.seasons.map((season) => ({
      ka: season.ka,
      en: season.en,
      query: season.query,
      _id: season._id,
    })),
    gender: {
      query: payload.gender.query,
      ka: payload.gender.ka,
      en: payload.gender.en,
    },
    textures: payload.textures.map((texture) => ({
      percentage: texture.percentage,
      ka: texture.textures.ka,
      en: texture.textures.en,
      _id: texture.textures._id,
    })),
    warnings: payload.warnings.map((warning) => ({
      ka: warning.ka,
      en: warning.en,
    })),
  };

  if (payload.thumbnail) credentials.thumbnail = payload.thumbnail;
  if (payload.newThumbnail) credentials.media = payload.newThumbnail;

  if (payload.isUpdating && payload.updatingRegisteredProductId)
    credentials._id = payload.updatingRegisteredProductId;

  return credentials;
}
