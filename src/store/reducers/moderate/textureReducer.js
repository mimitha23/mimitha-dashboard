import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "../helpers";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
  },

  allTextures: [],

  isUpdating: false,
  updatingTextureId: "",

  status: {
    loading: false,
    error: null,
    message: "",
  },
};

const textureSlice = createSlice({
  name: "texture",
  initialState,
  reducers: {
    setTexture(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    setTextureDefaults(state, { payload }) {
      const form = {
        label_ka: payload.ka,
        label_en: payload.en,
      };

      state.form = form;

      state.isUpdating = true;
      state.updatingTextureId = payload._id;
    },

    // API
    createTexture: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    updateTexture: {
      prepare(payload) {
        return {
          payload: prepareDataForDB(payload),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    deleteTexture: {
      prepare(payload) {
        return {
          payload: { _id: payload },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setDeletedTexture(state, { payload }) {
      state.allTextures = state.allTextures.filter(
        (texture) => texture._id !== payload
      );
    },

    getAllTextures: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setAllTextures(state, { payload }) {
      state.allTextures = payload;
    },

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

    resetAllTextures(state) {
      state.allTextures = [];
    },

    resetFormState(state) {
      state.form = initialState.form;

      if (state.isUpdating) {
        state.isUpdating = false;
        state.updatingTextureId = "";
      }
    },
  },
});

export default textureSlice.reducer;
export const textureActions = textureSlice.actions;

function prepareDataForDB(payload) {
  const credentials = {
    ka: payload.label_ka,
    en: payload.label_en,
  };

  if (payload.isUpdating && payload.updatingTextureId)
    credentials._id = payload.updatingTextureId;

  return credentials;
}
