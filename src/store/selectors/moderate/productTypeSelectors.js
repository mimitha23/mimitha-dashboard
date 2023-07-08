import { createSelector } from "@reduxjs/toolkit";

const selectedProductTypeForm = ({ productType }) => ({
  label_ka: productType.form.label_ka,
  label_en: productType.form.label_en,
  isUpdating: productType.isUpdating,
  updatingProductTypeId: productType.updatingProductTypeId,
});

const selectedProductTypeStatus = ({ productType }) => ({
  loading: productType.status.loading,
  error: productType.status.error,
  message: productType.status.message,
});

export const selectAllProductTypes = ({ productType }) =>
  productType.allProductTypes;

export const selectProductTypeForm = createSelector(
  selectedProductTypeForm,
  (memorised) => memorised
);

export const selectProductTypeStatus = createSelector(
  selectedProductTypeStatus,
  (memorised) => memorised
);
