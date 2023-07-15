import { createSelector } from "@reduxjs/toolkit";

const selectedAuthStatus = ({ auth }) => ({
  loading: auth.status.loading,
  error: auth.status.error,
  message: auth.status.message,
});

const selectedAuthForm = ({ auth }) => ({
  email: auth.form.email,
  password: auth.form.password,
});

const selectedUser = ({ auth }) => ({
  _id: auth.user._id,
  fullname: auth.user.fullname,
  email: auth.user.email,
  role: auth.user.role,
});

export const selectAuthStatus = createSelector(
  [selectedAuthStatus],
  (authStatus) => authStatus
);

export const selectAuthForm = createSelector(
  [selectedAuthForm],
  (authForm) => authForm
);

export const selectUser = createSelector([selectedUser], (user) => user);
