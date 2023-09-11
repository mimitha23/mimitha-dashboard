import { createSlice } from "@reduxjs/toolkit";
import { controlStatus as status } from "store/reducers/helpers";

const initialState = {
  form: {
    label_ka: "",
    label_en: "",
  },

  allTextures: [],

  isUpdating: false,
  updatingTextureId: "",

  status: status.default(),
};

const textureSlice = createSlice({
  name: "texture",
  initialState,
  reducers: {
    // API
    createTexture: {
      prepare({ data }) {
        return {
          payload: prepareDataForDB({ data }),
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
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

    updateTexture: {
      prepare({ data, updatingTextureId }) {
        return {
          payload: prepareDataForDB({ data, updatingTextureId }),
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

function prepareDataForDB({ data, updatingTextureId }) {
  const credentials = {
    data: {
      ka: data.label_ka,
      en: data.label_en,
    },
  };

  if (updatingTextureId) credentials.updatingTextureId = updatingTextureId;

  return credentials;
}
