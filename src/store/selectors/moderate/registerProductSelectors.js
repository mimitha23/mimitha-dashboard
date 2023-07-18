import { createSelector } from "@reduxjs/toolkit";

const selectedRegisterProductForm = ({ registerProduct }) => ({
  isEditable: registerProduct.form.isEditable,
  productTypes: registerProduct.form.productTypes,
  gender: registerProduct.form.gender,
  category: registerProduct.form.category,
  productStyles: registerProduct.form.productStyles,
  seasons: registerProduct.form.seasons,
  warning: registerProduct.form.warning,
  warnings: registerProduct.form.warnings,
  textures: registerProduct.form.textures,
  thumbnail: registerProduct.form.thumbnail,
  newThumbnail: registerProduct.form.newThumbnail,
  isUpdating: registerProduct.isUpdating,
  updatingRegisteredProductId: registerProduct.updatingRegisteredProductId,
});

const selectedRegisterProductStatus = ({ registerProduct }) => ({
  loading: registerProduct.status.loading,
  error: registerProduct.status.error,
  message: registerProduct.status.message,
});

const selectedRegisterProductFormSuggestions = ({ registerProduct }) => ({
  productTypes: registerProduct.registerProductFormSuggestions.productTypes,
  productStyles: registerProduct.registerProductFormSuggestions.productStyles,
  seasons: registerProduct.registerProductFormSuggestions.seasons,
  gender: registerProduct.registerProductFormSuggestions.gender,
  textures: registerProduct.registerProductFormSuggestions.textures,
  categories: registerProduct.registerProductFormSuggestions.categories,
});

export const selectRegisterProductForm = createSelector(
  selectedRegisterProductForm,
  (memorized) => memorized
);

export const selectRegisterProductStatus = createSelector(
  selectedRegisterProductStatus,
  (memorized) => memorized
);

export const selectRegisterProductFormSuggestions = createSelector(
  selectedRegisterProductFormSuggestions,
  (memorized) => memorized
);

export const selectAllRegisteredProducts = ({ registerProduct }) =>
  registerProduct.allRegisteredProducts;
