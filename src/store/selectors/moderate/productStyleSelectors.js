import { createSelector } from "@reduxjs/toolkit";

const selectedProductStyleForm = ({ productStyle }) => ({
  label_ka: productStyle.form.label_ka,
  label_en: productStyle.form.label_en,
  isUpdating: productStyle.isUpdating,
  updatingProductStyleId: productStyle.updatingProductStyleId,
});

const selectedProductStyleStatus = ({ productStyle }) => ({
  stage: productStyle.status.stage,
  loading: productStyle.status.loading,
  error: productStyle.status.error,
  message: productStyle.status.message,
});

export const selectAllProductStyles = ({ productStyle }) =>
  productStyle.allProductStyles;

export const selectProductStyleForm = createSelector(
  selectedProductStyleForm,
  (memorised) => memorised
);

export const selectProductStyleStatus = createSelector(
  selectedProductStyleStatus,
  (memorised) => memorised
);
