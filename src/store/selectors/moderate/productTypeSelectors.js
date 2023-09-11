import { createSelector } from "@reduxjs/toolkit";

const selectedProductTypeForm = ({ productType }) => ({
  label_ka: productType.form.label_ka,
  label_en: productType.form.label_en,
  isUpdating: productType.isUpdating,
  updatingProductTypeId: productType.updatingProductTypeId,
});

const selectedProductTypeStatus = ({ productType }) => ({
  stage: productType.status.stage,
  loading: productType.status.loading,
  error: productType.status.error,
  message: productType.status.message,
});

const selectedProductTypesWithCaption = ({ productType }) =>
  productType.allProductTypes.map((type) => ({
    ...type,
    caption: type.ka || "",
  }));

// EXPORTS
export const selectAllProductTypes = ({ productType }) =>
  productType.allProductTypes;

export const selectProductTypeForm = createSelector(
  selectedProductTypeForm,
  (productTypeForm) => productTypeForm
);

export const selectProductTypeStatus = createSelector(
  selectedProductTypeStatus,
  (status) => status
);

export const selectProductTypesWithCaption = createSelector(
  selectedProductTypesWithCaption,
  (productTypesWithCaption) => productTypesWithCaption
);
