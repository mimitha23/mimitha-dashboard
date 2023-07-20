import {
  controlStatus as status,
  createQueryStr,
} from "store/reducers/helpers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
  },

  allNavRoutes: [],

  isUpdating: "",
  updatingNavRouteId: "",

  status: {
    loading: false,
    error: false,
    message: "",
  },
};

const navRoutesReducer = createSlice({
  name: "nav-routes-reducer",
  initialState,
  reducers: {
    setNavRouteForm(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    // API
    createNavRoute: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },
      reducer(state) {
        state.status = status.loading();
      },
    },

    setNavRouteDefaults(state, { payload }) {
      const form = {
        label_ka: payload.ka,
        label_en: payload.en,
      };

      state.form = form;

      state.isUpdating = true;
      state.updatingNavRouteId = payload._id;
    },

    updateNavRoute: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },
      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteNavRoute: {
      prepare(payload) {
        return {
          payload: {
            _id: payload,
          },
        };
      },
      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedRoute(state, { payload: routeId }) {
      state.allNavRoutes = state.allNavRoutes.filter(
        (route) => route._id !== routeId
      );
    },

    getAllNavRoute: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllNavRoutes(state, { payload: routes }) {
      state.allNavRoutes = routes;
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

    resetAllNavRoutes(state) {
      state.allNavRoutes = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingNavRouteId = "";
      }
    },
  },
});

export default navRoutesReducer.reducer;
export const navRoutesActions = navRoutesReducer.actions;

function prepareDataForDB(payload) {
  const credentials = {
    ka: payload.label_ka,
    en: payload.label_en,
    query: createQueryStr(payload.label_en),
  };

  if (payload.updatingNavRouteId) credentials._id = payload.updatingNavRouteId;

  return credentials;
}
