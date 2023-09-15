import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";
import { FileChange } from "utils";

const initialState = {
  form: {
    isEditable: false,
    thumbnail: "",
    newThumbnail: "",
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
        percentage: "",
        texture: {
          ka: "",
          en: "",
          _id: "",
          caption: "",
        },
      },
    ],
    warnings: [
      {
        ka: "",
        en: "",
      },
    ],
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

  status: status.default(),
};

const registerProductSlice = createSlice({
  name: "registered-products",
  initialState,
  reducers: {
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
        isEditable: payload.isEditable,
        thumbnail: payload.thumbnail,
        productTypes: {
          ...payload.productType,
          caption: payload.productType.ka,
        },
        gender: {
          ...payload.productType,
          caption: payload.gender.ka,
        },
        category: {
          ...payload.category,
          caption: payload.category.ka,
        },
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
          texture: {
            _id: texture._id,
            ka: texture.ka,
            en: texture.en,
            caption: texture.ka,
          },
        })),
        warnings: payload.warnings,
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
        ka: texture.texture.ka,
        en: texture.texture.en,
        _id: texture.texture._id,
      })),
      warnings: data.warnings.map((warning) => ({
        ka: warning.ka,
        en: warning.en,
      })),
    },
  };

  if (data.thumbnail) credentials.data.thumbnail = data.thumbnail;
  if (data.newThumbnail) {
    const blob = FileChange.convertBase64StrToFile({
      base64Str: data.newThumbnail,
    });
    credentials.data.media = blob;
  }

  if (updatingRegisteredProductId)
    credentials.updatingRegisteredProductId = updatingRegisteredProductId;

  return credentials;
}
