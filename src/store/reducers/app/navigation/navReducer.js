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
    addNavSubCategory(state, { payload: { categoryId, placeAfterIndex } }) {
      const { categoryIndex } = findBlockIndex({ state, categoryId });

      if (isNaN(categoryIndex)) return;

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

      state.nav[categoryIndex].blocks.splice(
        placeAfterIndex,
        0,
        newSubCategoryBlock
      );
    },

    removeNavSubCategory(state, { payload: { categoryId, subCategoryId } }) {
      const { categoryIndex } = findBlockIndex({ state, categoryId });

      if (isNaN(categoryIndex)) return;

      state.nav[categoryIndex].blocks = state.nav[categoryIndex].blocks.filter(
        (subCategory) => subCategory._id !== subCategoryId
      );
    },

    setRoute(
      state,
      { payload: { categoryId, subCategoryId, routeId, value } }
    ) {
      const { categoryIndex, routeIndex, subCategoryIndex } = findBlockIndex({
        state,
        categoryId,
        subCategoryId,
        routeId,
      });

      if (isNaN(categoryIndex) || isNaN(subCategoryIndex) || isNaN(routeIndex))
        return;

      state.nav[categoryIndex].blocks[subCategoryIndex].routes[
        routeIndex
      ].caption = value;
    },

    selectRoute(
      state,
      { payload: { categoryId, subCategoryId, routeId, value } }
    ) {
      const { categoryIndex, routeIndex, subCategoryIndex } = findBlockIndex({
        state,
        categoryId,
        subCategoryId,
        routeId,
      });

      if (isNaN(categoryIndex) || isNaN(subCategoryIndex) || isNaN(routeIndex))
        return;

      if (value === null) {
        state.nav[categoryIndex].blocks[subCategoryIndex].routes[routeIndex] = {
          ka: "",
          en: "",
          query: "",
          caption: "",
          _id: nanoid(),
        };

        return;
      }

      const isSelectedValue = state.nav[categoryIndex].blocks[
        subCategoryIndex
      ].routes.some((route) => route._id === value._id);

      if (isSelectedValue) return;

      state.nav[categoryIndex].blocks[subCategoryIndex].routes[routeIndex] =
        value;
    },

    addRoute(
      state,
      { payload: { categoryId, subCategoryId, placeAfterIndex } }
    ) {
      const { categoryIndex, subCategoryIndex } = findBlockIndex({
        state,
        categoryId,
        subCategoryId,
      });

      if (isNaN(categoryIndex) || isNaN(subCategoryIndex)) return;

      const newRoute = {
        ka: "",
        en: "",
        query: "",
        caption: "",
        _id: nanoid(),
      };

      state.nav[categoryIndex].blocks[subCategoryIndex].routes.splice(
        placeAfterIndex,
        0,
        newRoute
      );
    },

    removeRoute(state, { payload: { categoryId, subCategoryId, routeId } }) {
      const { categoryIndex, subCategoryIndex } = findBlockIndex({
        state,
        categoryId,
        subCategoryId,
      });

      if (
        isNaN(categoryIndex) ||
        isNaN(subCategoryIndex) ||
        state.nav[categoryIndex].blocks[subCategoryIndex].routes.length === 1
      )
        return;

      state.nav[categoryIndex].blocks[subCategoryIndex].routes = state.nav[
        categoryIndex
      ].blocks[subCategoryIndex].routes.filter(
        (route) => route._id !== routeId
      );
    },

    setTitle(state, { payload: { categoryId, subCategoryId, key, value } }) {
      const { categoryIndex, subCategoryIndex } = findBlockIndex({
        state,
        categoryId,
        subCategoryId,
      });

      if (isNaN(categoryIndex) || isNaN(subCategoryIndex)) return;

      state.nav[categoryIndex].blocks[subCategoryIndex].title[key] = value;
    },

    // API
    getNav: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setNav(state, { payload: nav }) {
      state.nav = nav.map((navCategory) => ({
        ...navCategory,
        blocks: navCategory.blocks.map((block) => ({
          ...block,
          routes: block.routes.map((route) => ({
            ...route,
            caption: route.ka,
          })),
        })),
      }));
    },

    saveNav: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
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

function findBlockIndex({ state, categoryId, subCategoryId, routeId }) {
  const categoryIndex = state.nav.findIndex(
    (category) => category._id === categoryId
  );

  const subCategoryIndex =
    subCategoryId && categoryIndex >= 0
      ? state.nav[categoryIndex].blocks.findIndex(
          (subCategory) => subCategory._id === subCategoryId
        )
      : NaN;

  const routeIndex =
    routeId && categoryIndex >= 0 && subCategoryIndex >= 0
      ? state.nav[categoryIndex].blocks[subCategoryIndex].routes.findIndex(
          (route) => route._id === routeId
        )
      : NaN;

  return { categoryIndex, subCategoryIndex, routeIndex };
}

function prepareDataForDB(payload) {
  const men = payload.find((nav) => nav.category === "men");
  const women = payload.find((nav) => nav.category === "women");
  const family = payload.find((nav) => nav.category === "family");
  const adult = payload.find((nav) => nav.category === "adult");

  function configureData(data) {
    return {
      ...data,
      blocks: data.blocks.map((block) => ({
        ...block,
        routes: block.routes.map((route) => route._id),
      })),
    };
  }

  const credentials = {
    men: configureData(men),
    women: configureData(women),
    family: configureData(family),
    adult: configureData(adult),
  };

  return credentials;
}
