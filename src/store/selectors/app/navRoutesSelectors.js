import { createSelector } from "@reduxjs/toolkit";

const selectedNavRoutesStatus = ({ navRoutes }) => ({
  loading: navRoutes.status.loading,
  error: navRoutes.status.error,
  message: navRoutes.status.message,
});

const selectedNavRoutesForm = ({ navRoutes }) => ({
  label_ka: navRoutes.form.label_ka,
  label_en: navRoutes.form.label_en,
  isUpdating: navRoutes.isUpdating,
  updatingNavRouteId: navRoutes.updatingNavRouteId,
});

const selectedAllNavRoutesWithCaption = ({ navRoutes }) =>
  navRoutes.allNavRoutes.map((route) => ({
    ...route,
    caption: route.ka,
  }));

export const selectNavRoutesStatus = createSelector(
  [selectedNavRoutesStatus],
  (status) => status
);

export const selectNavRoutesForm = createSelector(
  [selectedNavRoutesForm],
  (form) => form
);

export const selectAllNavRoutes = ({ navRoutes }) => navRoutes.allNavRoutes;

export const selectAllNavRoutesWithCaption = createSelector(
  selectedAllNavRoutesWithCaption,
  (routes) => routes
);
