import { createSelector } from "@reduxjs/toolkit";

const selectedNavStatus = ({ nav }) => ({
  loading: nav.status.loading,
  error: nav.status.error,
  message: nav.status.message,
});

const selectedNavSubCategoryTitle =
  ({ categoryId, subCategoryId }) =>
  ({ nav }) =>
    nav.nav
      .find((navCategory) => navCategory._id === categoryId)
      .blocks.find((subCategory) => subCategory._id === subCategoryId).title;

const selectedSubCategoryRoutes =
  ({ categoryId, subCategoryId }) =>
  ({ nav }) =>
    nav.nav
      .find((navCategory) => navCategory._id === categoryId)
      .blocks.find((subCategory) => subCategory._id === subCategoryId).routes;

export const selectNavStatus = createSelector(
  [selectedNavStatus],
  (status) => status
);

export const selectNav = ({ nav }) => nav.nav;

export const selectNavSubCategoryTitle = createSelector(
  selectedNavSubCategoryTitle,
  (title) => title
);

export const selectSubCategoryRoutes = createSelector(
  selectedSubCategoryRoutes,
  (routes) => routes
);
