import { createSlice, nanoid } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  nav: [],

  status: {
    loading: false,
    error: false,
    message: "",
  },
};

const navReducer = createSlice({
  name: "mimitha-nav",
  initialState,
  reducers: {
    addSubCategory(state, { payload: { blockId, placeAfterIndex } }) {
      const blockIndex = state.nav.findIndex((block) => block._id === blockId);

      if (blockIndex < 0) return;

      const newSubCategoryBlock = {
        _id: nanoid(),
        title: {
          ka: "",
          en: "",
        },
        routes: [
          {
            ka: "",
            en: "",
            query: "",
            caption: "",
            _id: nanoid(),
          },
        ],
      };

      state.nav[blockIndex].blocks.splice(
        placeAfterIndex,
        0,
        newSubCategoryBlock
      );
    },

    setRoute(
      state,
      { payload: { categoryId, subCategoryId, routeId, value } }
    ) {
      const categoryIndex = state.nav.findIndex(
        (category) => category._id === categoryId
      );

      if (categoryIndex < 0) return;

      const subCategoryIndex = state.nav[categoryIndex].blocks.findIndex(
        (subCategory) => subCategory._id === subCategoryId
      );

      if (subCategoryIndex < 0) return;

      const routeIndex = state.nav[categoryIndex].blocks[
        subCategoryIndex
      ].routes.findIndex((route) => route._id === routeId);

      if (routeIndex < 0) return;

      state.nav[categoryIndex].blocks[subCategoryIndex].routes[
        routeIndex
      ].caption = value;
    },

    selectRoute(
      state,
      { payload: { categoryId, subCategoryId, routeId, value } }
    ) {
      const categoryIndex = state.nav.findIndex(
        (category) => category._id === categoryId
      );

      if (categoryIndex < 0) return;

      const subCategoryIndex = state.nav[categoryIndex].blocks.findIndex(
        (subCategory) => subCategory._id === subCategoryId
      );

      if (subCategoryIndex < 0) return;

      const routeIndex = state.nav[categoryIndex].blocks[
        subCategoryIndex
      ].routes.findIndex((route) => route._id === routeId);

      if (routeIndex < 0) return;

      state.nav[categoryIndex].blocks[subCategoryIndex].routes[routeIndex] =
        value;
    },

    setTitle(state, { payload: { categoryId, subCategoryId, key, value } }) {
      const categoryIndex = state.nav.findIndex(
        (category) => category._id === categoryId
      );

      if (categoryIndex < 0) return;

      const subCategoryIndex = state.nav[categoryIndex].blocks.findIndex(
        (subCategory) => subCategory._id === subCategoryId
      );

      if (subCategoryIndex < 0) return;
      console.log({ categoryId, subCategoryId, key, value });
      state.nav[categoryIndex].blocks[subCategoryIndex].title[key] = value;
    },

    // API
    getNav: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setNav(state, { payload }) {
      state.nav = payload;
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
  },
});

export default navReducer.reducer;
export const navActions = navReducer.actions;
