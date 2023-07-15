import { createSlice } from "@reduxjs/toolkit";
import { controllStatus as status } from "./helpers";
import { jwt } from "utils";

const initialState = {
  form: {
    email: "",
    password: "",
  },

  user: {
    _id: "",
    fullname: "",
    email: "",
    // role: "",
  },

  status: {
    loading: false,
    error: false,
    message: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthForm(state, { payload: { key, value } }) {
      state.form[key] = value;
    },

    login: {
      prepare(paylaod) {
        return {
          payload: {
            email: paylaod.email,
            password: paylaod.password,
          },
        };
      },

      reducer(state) {
        state.status = status.loading();
      },
    },

    setUser(state, { payload }) {
      state.user = {
        _id: payload.user._id,
        email: payload.user.email,
        fullname: payload.user.fullname,
        // role: payload.user.role,
      };

      jwt.setJWT(payload.accessToken);
    },

    logout: {
      reducer(state) {
        state.status = status.loading();
      },
    },

    setLogedoutUser(state) {
      state.user = initialState.user;
      jwt.removeJWT();
    },

    // REQUEST STATUS SETTERS
    setSuccess(state) {
      state.status = status.success();
    },

    setError(state, { payload }) {
      state.status = status.error(payload.message);
    },

    // RESET
    resetForm(state) {
      state.form = initialState.form;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
