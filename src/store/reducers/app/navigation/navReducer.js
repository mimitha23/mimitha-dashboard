import { createSlice } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  nav: {
    men: {
      _id: "",
      category: "men",
      blocks: [],
    },
    women: {
      _id: "",
      category: "women",
      blocks: [],
    },
    adult: {
      _id: "",
      category: "adult",
      blocks: [],
    },
    family: {
      _id: "",
      category: "family",
      blocks: [],
    },
  },

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
    // API
    getNav: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setNav(state, { payload: nav }) {
      Object.keys(state.nav).forEach((key) => {
        const block = nav.find((block) => block.category === key);

        state.nav[key] = {
          _id: block._id,
          category: block.category,
          blocks: block.blocks.map((block) => ({
            ...block,
            routes: block.routes.map((route) => ({
              ...route,
              caption: route.ka,
            })),
          })),
        };
      });
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

function prepareDataForDB(payload) {
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
    men: configureData(payload.men),
    women: configureData(payload.women),
    family: configureData(payload.family),
    adult: configureData(payload.adult),
  };

  return credentials;
}
