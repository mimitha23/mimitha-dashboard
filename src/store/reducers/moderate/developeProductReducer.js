import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  form: {
    title_ka: "",
    title_en: "",
    price: "",
    color: {
      ka: "",
      en: "",
      _id: "",
      caption: "",
    },
    sizes: [
      {
        amount: "",
        size: {
          ka: "",
          en: "",
          _id: "",
          caption: "",
        },
      },
    ],
    variants: [],
    description_ka: "",
    description_en: "",
    is_public: false,
    is_featured: false,
    assets: [],
    thumbnails: ["", ""],
    mannequin: "",
    model_video: "",
    simulation_video_placing: "",
    simulation_video_pick_up: "",
  },

  developeProductFormSuggestions: {
    variants: [],
    colors: [],
    sizes: [],
  },

  allDevelopedProducts: [],

  developedProduct: null,

  isUpdating: false,
  updatingDevelopedProductId: "",

  status: status.default(),

  singleProductStatus: status.default(),
};

const developeProductSlice = createSlice({
  name: "developed-products",
  initialState,
  reducers: {
    // API
    attachDevelopedProduct: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDevelopedProductDefaults(state, { payload }) {
      const form = {
        title_ka: payload.title.ka,
        title_en: payload.title.en,
        price: payload.price,
        color: { ...payload.color, caption: payload.color.ka },
        sizes: payload.size.map((size) => ({
          _id: nanoid(),
          size: {
            ka: size.size,
            en: size.size,
            caption: size.size,
            _id: size._id,
          },
          amount: size.amount,
        })),
        variants: payload.variants.map((variant) => ({
          ...variant,
          caption: variant.ka,
        })),
        description_ka: payload.description.ka,
        description_en: payload.description.en,
        is_public: payload.isPublic,
        is_featured: payload.isFeatured,
        assets: payload.assets,
      };

      state.form = {
        ...initialState.form,
        ...form,
      };

      state.isUpdating = true;
      state.updatingDevelopedProductId = payload._id;
    },

    updateDevelopedProduct: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteDevelopedProduct: {
      prepare(payload) {
        return {
          payload: {
            registeredProductId: payload.registeredProductId,
            developedProductId: payload.developedProductId,
          },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedDevelopedProduct(state, { payload }) {
      state.allDevelopedProducts = state.allDevelopedProducts.filter(
        (product) => product._id !== payload
      );
    },

    getAllDevelopedProducts: {
      prepare(payload) {
        return {
          payload: {
            registeredProductId: payload.registeredProductId,
          },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllDevelopedProducts(state, { payload }) {
      state.allDevelopedProducts = payload;
    },

    getDevelopedProduct: {
      prepare(payload) {
        return {
          payload: {
            registeredProductId: payload.registeredProductId,
            productId: payload.developedProductId,
            getDefaults: payload.getDefaults ? true : false,
          },
        };
      },

      reducer(state, { payload }) {
        state[payload.getDefaults ? "status" : "singleProductStatus"] =
          status.loading();
      },
    },

    setActiveDevelopedProduct(state, { payload }) {
      state.developedProduct = payload;
    },

    copyDevelopedProductConfig: {
      prepare(payload) {
        return {
          payload: {
            registeredProductId: payload.registeredProductId,
            params: payload.params,
          },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setCopyDevelopedProductConfig(state, { payload }) {
      const form = {
        price: payload.price,
        sizes: payload.size.map((size) => ({
          _id: nanoid(),
          size: {
            ka: size.size,
            en: size.size,
            caption: size.size,
            _id: size._id,
          },
          amount: size.amount,
        })),
        variants: payload.variants.map((variant) => ({
          ...variant,
          caption: variant.ka,
        })),
        description_ka: payload.description.ka,
        description_en: payload.description.en,
        is_public: payload.isPublic,
        is_featured: payload.is_featured,
      };

      state.form = {
        ...initialState.form,
        ...form,
      };
    },

    getDevelopeProductFormSuggestions: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setDevelopeProductFormSuggestions(state, { payload }) {
      const editedSuggestions = {};

      Object.keys(payload).forEach((key) => {
        const editedList = payload[key].map((item) => ({
          ...item,
          caption: item.ka ? item.ka : item.label_ka ? item.label_ka : "",
          _id: item._id ? item._id : nanoid(),
        }));

        editedSuggestions[key] = editedList;
      });

      state.developeProductFormSuggestions = editedSuggestions;
    },

    // REQUEST STATUS SETTERS
    setSuccess(state) {
      state.status = status.success();
    },

    setError(state, { payload }) {
      state.status = status.error(payload.message);
    },

    setSingleProductSuccess(state) {
      state.singleProductStatus = status.success();
    },

    setSingleProductError(state, { payload }) {
      state.singleProductStatus = status.error(payload.message);
    },

    // RESET
    resetState(state) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },

    resetAllDevelopedProducts(state) {
      state.allDevelopedProducts = [];
    },

    resetDevelopedProduct(state) {
      state.developedProduct = null;
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingDevelopedProductId = "";
      }
    },
  },
});

export default developeProductSlice.reducer;
export const developeProductActions = developeProductSlice.actions;

function prepareDataForDB(payload) {
  const credentials = {
    product: payload.registeredProductId,
    isPublic: payload.is_public,
    isFeatured: payload.is_featured,
    title: {
      ka: payload.title_ka,
      en: payload.title_en,
    },
    price: payload.price,
    color: {
      ka: payload.color.ka,
      en: payload.color.en,
      hex: payload.color.hex,
      _id: payload.color._id,
    },
    size: payload.sizes.map((size) => ({
      size: size.size.en,
      amount: size.amount,
    })),
    inStock: payload.sizes.reduce(
      (acc, size) => acc + parseFloat(size.amount),
      0
    ),
    variants: payload.variants.map((variant) => variant._id),
    description: {
      ka: payload.description_ka,
      en: payload.description_en,
    },
  };

  if (payload.isUpdating) {
    credentials._id = payload.updatingDevelopedProductId;
    credentials.filesToDelete = payload.filesToDelete;
    credentials.assets = payload.assets.filter(
      (asset) => !(asset instanceof File) && typeof asset === "string"
    );
    if (payload.filesToUpload[0]) credentials.media = payload.filesToUpload;
  } else {
    credentials.media = payload.filesToUpload;
  }

  return credentials;
}
