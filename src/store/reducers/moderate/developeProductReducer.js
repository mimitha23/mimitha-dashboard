import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";
import { FileChange } from "utils";

const initialState = {
  form: {
    title_ka: "",
    title_en: "",
    price: "",
    variants: [],
    description_ka: "",
    description_en: "",
    is_public: false,
    is_featured: false,
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
    assets: [],
    thumbnails: ["", ""],
    mannequin: "",
    modelVideo: "",
    placingVideo: "",
    pickUpVideo: "",
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
      prepare({ data, registeredProductId }) {
        return {
          payload: prepareDataForDB({ data, registeredProductId }),
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
          caption: variant.label_ka,
        })),
        description_ka: payload.description.ka,
        description_en: payload.description.en,
        is_public: payload.isPublic,
        is_featured: payload.isFeatured,
        assets: payload.assets,
        thumbnails: payload.thumbnails,
        mannequin: payload.mannequin,
        modelVideo: payload.modelVideo,
        placingVideo: payload.placingVideo,
        pickUpVideo: payload.pickUpVideo,
      };

      state.form = {
        ...initialState.form,
        ...form,
      };

      state.isUpdating = true;
      state.updatingDevelopedProductId = payload._id;
    },

    updateDevelopedProduct: {
      prepare({ data, registeredProductId, updatingDevelopedProductId }) {
        return {
          payload: prepareDataForDB({
            data,
            registeredProductId,
            updatingDevelopedProductId,
          }),
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
    setStatusSuccess(state, { payload }) {
      state.status = status.success(payload);
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

function prepareDataForDB({
  data,
  registeredProductId,
  updatingDevelopedProductId,
}) {
  const credentials = {
    registeredProductId,
    data: {
      product: registeredProductId,
      price: data.price,
      isPublic: data.is_public,
      isFeatured: data.is_featured,
      variants: data.variants.map((variant) => variant._id),
      inStock: data.sizes.reduce(
        (acc, size) => acc + parseFloat(size.amount),
        0
      ),
      title: {
        ka: data.title_ka,
        en: data.title_en,
      },
      description: {
        ka: data.description_ka,
        en: data.description_en,
      },
      size: data.sizes.map((size) => ({
        size: size.size.en,
        amount: size.amount,
      })),
      color: {
        ka: data.color.ka,
        en: data.color.en,
        hex: data.color.hex,
        _id: data.color._id,
      },
      assets: data.assets,
      thumbnails: data.thumbnails,
      mannequin: data.mannequin,
      modelVideo: data.modelVideo,
      placingVideo: data.placingVideo,
      pickUpVideo: data.pickUpVideo,
    },
  };

  if (data.new_assets[0]) {
    credentials.data.new_assets = data.new_assets.map((base64Str) =>
      FileChange.convertBase64StrToFile({ base64Str })
    );

    if (updatingDevelopedProductId && data.assets_to_delete[0])
      credentials.data.assetsToDelete = data.assets_to_delete;
  }

  if (data.new_thumbnails.map((src) => src !== undefined && src !== "")[0]) {
    credentials.data.new_thumbnails = data.new_thumbnails
      .filter((src) => src !== undefined && src !== "")
      .map((base64Str) => FileChange.convertBase64StrToFile({ base64Str }));

    if (updatingDevelopedProductId && data.thumbnails_to_delete[0])
      credentials.data.thumbnailsToDelete = data.thumbnails_to_delete;
  }

  if (data.new_mannequin)
    credentials.data.new_mannequin = FileChange.convertBase64StrToFile({
      base64Str: data.new_mannequin,
    });

  if (data.new_model_video)
    credentials.data.new_model_video = data.new_model_video;

  if (data.new_simulation_video_placing)
    credentials.data.new_simulation_video_placing =
      data.new_simulation_video_placing;

  if (data.new_simulation_video_pick_up)
    credentials.data.new_simulation_video_pick_up =
      data.new_simulation_video_pick_up;

  if (updatingDevelopedProductId)
    credentials.updatingDevelopedProductId = updatingDevelopedProductId;

  return credentials;
}
