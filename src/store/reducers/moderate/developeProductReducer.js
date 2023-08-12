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
      caption: "",
      _id: "",
    },
    sizes: [
      {
        _id: nanoid(),
        size: {
          ka: "",
          en: "",
          caption: "",
          _id: "",
        },
        amount: "",
      },
    ],
    enteredVariant: "",
    variants: [],
    description_ka: "",
    description_en: "",
    isPublic: false,
    isFeatured: false,
    assets: [],
    filesToUpload: [],
    filesToDelete: [],
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

  status: {
    loading: false,
    error: null,
    message: "",
  },

  singleProductStatus: {
    loading: false,
    error: null,
    message: "",
  },
};

const developeProductSlice = createSlice({
  name: "developed-products",
  initialState,
  reducers: {
    // primitives
    setDevelopedProduct(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    // variant
    selectVariant(state, { payload: variant }) {
      const variantIsSelected = state.form.variants.find(
        (v) => v._id === variant._id
      );

      if (variantIsSelected) return;

      state.form.variants = [...state.form.variants, variant].sort(
        (variantA, variantB) => (variantA.type < variantB.type ? -1 : 1)
      );
    },

    removeVariant(state, { payload }) {
      state.form.variants = state.form.variants
        .filter((v) => v._id !== payload)
        .sort((variantA, variantB) => (variantA.type < variantB.type ? -1 : 1));
    },

    // size
    addSizeField(state) {
      const lastSize = [...state.form.sizes].pop();

      // check if last field is filled, otherwise don't let add new field
      const lastSizeFieldIsFilled = Object.values(lastSize).every(
        (fieldValue) =>
          (typeof fieldValue === "string" && fieldValue.trim() !== "") ||
          (typeof fieldValue === "object" &&
            Object.values(fieldValue).every((value) => value.trim() !== ""))
      );

      lastSizeFieldIsFilled &&
        state.form.sizes.push({ ...initialState.form.sizes[0], _id: nanoid() });
    },

    removeSizeField(state, { payload }) {
      state.form.sizes = state.form.sizes.filter(
        (size) => size._id !== payload
      );
    },

    setSize(state, { payload: { key, value, fieldId } }) {
      const activeFieldIndex = state.form.sizes.findIndex(
        (field) => field._id === fieldId
      );

      if (activeFieldIndex < 0) return;

      if (key === "amount") {
        state.form.sizes[activeFieldIndex].amount = value;
      } else if (key === "size") {
        state.form.sizes[activeFieldIndex].size.caption = value;
      }
    },

    selectSize(state, { payload: { value: size, fieldId } }) {
      const activeFieldIndex = state.form.sizes.findIndex(
        (field) => field._id === fieldId
      );

      if (activeFieldIndex < 0) return;

      if (size === null) {
        state.form.sizes[activeFieldIndex].size =
          initialState.form.sizes[0].size;

        return;
      }

      state.form.sizes[activeFieldIndex].size = size;
    },

    // color
    setColor(state, { payload: { value } }) {
      state.form.color.caption = value;
    },

    selectColor(state, { payload: { value: color } }) {
      if (color === null) {
        state.form.color = initialState.form.color;
        return;
      }

      state.form.color = color;
    },

    // isPublic
    setCheckbox(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    // assets
    setAssets(state, { payload }) {
      const files = Array.from(payload);

      const filterAsset = (asset, file) =>
        asset instanceof Blob && asset.name === file.name;

      files.forEach((file) => {
        if (!state.form.assets.some((asset) => filterAsset(asset, file)))
          state.form.assets.push(file);
        if (!state.form.filesToUpload.some((asset) => filterAsset(asset, file)))
          state.form.filesToUpload.push(file);
      });
    },

    removeAsset(state, { payload }) {
      const filterFile = (asset) =>
        (asset instanceof Blob && asset.name !== payload.name) ||
        typeof asset === "string";

      if (payload instanceof Blob) {
        state.form.assets = state.form.assets.filter(filterFile);
        state.form.filesToUpload = state.form.filesToUpload.filter(filterFile);
      } else {
        state.form.assets = state.form.assets.filter(
          (asset) => asset !== payload
        );

        state.form.filesToDelete.push(payload);
      }
    },

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
        isPublic: payload.isPublic,
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
        isPublic: payload.isPublic,
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
          caption: item.ka,
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
    isPublic: payload.isPublic,
    isFeatured: payload.isFeatured,
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
