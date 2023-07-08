import { createSelector } from "@reduxjs/toolkit";

const selectedRegisterProductForm = ({ registerProduct }) => ({
  isEditable: registerProduct.form.isEditable,
  productTypes: registerProduct.form.productTypes,
  gender: registerProduct.form.gender,
  productStyles: registerProduct.form.productStyles,
  seasons: registerProduct.form.seasons,
  warning: registerProduct.form.warning,
  warnings: registerProduct.form.warnings,
  textures: registerProduct.form.textures,
  thumbnail: registerProduct.form.thumbnail,
  newThumbnail: registerProduct.form.newThumbnail,
  isUpdating: registerProduct.isUpdating,
  updatingProductId: registerProduct.updatingProductId,
});

const selectedRegisterProductStatus = ({ registerProduct }) => ({
  loading: registerProduct.status.loading,
  error: registerProduct.status.error,
  message: registerProduct.status.message,
});

const selectedRegisterProductFormSugestions = ({ registerProduct }) => ({
  productTypes: registerProduct.registerProductFormSugestions.productTypes,
  productStyles: registerProduct.registerProductFormSugestions.productStyles,
  seasons: registerProduct.registerProductFormSugestions.seasons,
  gender: registerProduct.registerProductFormSugestions.gender,
  textures: registerProduct.registerProductFormSugestions.textures,
});

export const selectRegisterProductForm = createSelector(
  selectedRegisterProductForm,
  (memorised) => memorised
);

export const selectRegisterProductStatus = createSelector(
  selectedRegisterProductStatus,
  (memorised) => memorised
);

export const selectRegisterProductFormSugestions = createSelector(
  selectedRegisterProductFormSugestions,
  (memorised) => memorised
);
