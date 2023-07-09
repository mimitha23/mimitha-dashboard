import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

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
    variants: [],
    description_ka: "",
    description_en: "",
    assets: [],
  },

  developeProductFormSugestions: {
    variants: [],
    colors: [],
    sizes: [],
  },

  allDevelopedProducts: [],

  isUpdating: false,
  updatingDevelopedProductId: "",

  status: {
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
      if (size === null) {
        state.form.sizes = initialState.form.sizes;
        return;
      }

      const activeFieldIndex = state.form.sizes.findIndex(
        (field) => field._id === fieldId
      );

      if (activeFieldIndex < 0) return;

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
      const form = {};

      state.form = form;

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
          payload: { _id: payload },
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
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllDevelopedProducts(state, { payload }) {
      state.allDevelopedProducts = payload;
    },

    getDevelopeProductFormSugestions: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setDevelopeProductFormSugestions(state, { payload }) {
      const editedSugestions = {};

      Object.keys(payload).forEach((key) => {
        const editedList = payload[key].map((item) => ({
          ...item,
          caption: item.ka,
          _id: item._id ? item._id : nanoid(),
        }));

        editedSugestions[key] = editedList;
      });

      state.developeProductFormSugestions = editedSugestions;
    },

    // REQUEST STATUS SETTERS
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

    resetAllDevelopedProducts(state) {
      state.allDevelopedProducts = [];
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
  const credentials = {};

  if (payload.isUpdating && payload.updatingDevelopedProductId)
    credentials._id = payload.updatingDevelopedProductId;

  return credentials;
}
