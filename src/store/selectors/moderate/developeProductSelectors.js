import { createSelector } from "@reduxjs/toolkit";

// MEMORIZED SELECTORS
const selectedDevelopeProductFormSuggestions = ({ developeProduct }) => ({
  variants: developeProduct.developeProductFormSuggestions.variants,
  colors: developeProduct.developeProductFormSuggestions.colors,
  sizes: developeProduct.developeProductFormSuggestions.sizes,
});

//  Form including assets
const selectedDevelopeProductFullForm = ({ developeProduct }) => ({
  title_ka: developeProduct.form.title_ka,
  title_en: developeProduct.form.title_en,
  price: developeProduct.form.price,
  color: developeProduct.form.color,
  sizes: developeProduct.form.sizes,
  variants: developeProduct.form.variants,
  enteredVariant: developeProduct.form.enteredVariant,
  description_ka: developeProduct.form.description_ka,
  description_en: developeProduct.form.description_en,
  isFeatured: developeProduct.form.isFeatured,
  isPublic: developeProduct.form.isPublic,
  isUpdating: developeProduct.isUpdating,
  updatingDevelopedProductId: developeProduct.updatingDevelopedProductId,
  assets: developeProduct.form.assets,
  filesToUpload: developeProduct.form.filesToUpload,
  filesToDelete: developeProduct.form.filesToDelete,
});

// Form without assets
const selectedDevelopeProductForm = ({ developeProduct }) => ({
  title_ka: developeProduct.form.title_ka,
  title_en: developeProduct.form.title_en,
  price: developeProduct.form.price,
  color: developeProduct.form.color,
  sizes: developeProduct.form.sizes,
  variants: developeProduct.form.variants,
  enteredVariant: developeProduct.form.enteredVariant,
  description_ka: developeProduct.form.description_ka,
  description_en: developeProduct.form.description_en,
  isPublic: developeProduct.form.isPublic,
  isFeatured: developeProduct.form.isFeatured,
  isUpdating: developeProduct.isUpdating,
  updatingDevelopedProductId: developeProduct.updatingDevelopedProductId,
});

const selectedDevelopeProductAssets = ({ developeProduct }) => ({
  assets: developeProduct.form.assets,
  filesToUpload: developeProduct.form.filesToUpload,
  filesToDelete: developeProduct.form.filesToDelete,
});

const selectedDevelopeProductStatus = ({ developeProduct }) => ({
  loading: developeProduct.status.loading,
  error: developeProduct.status.error,
  message: developeProduct.status.message,
});

const selectedAllDevelopedProducts = ({ developeProduct }) =>
  developeProduct.allDevelopedProducts;

const selectedSingleDevelopeProductStatus = ({ developeProduct }) => ({
  loading: developeProduct.singleProductStatus.loading,
  error: developeProduct.singleProductStatus.error,
  message: developeProduct.singleProductStatus.message,
});

// SELECTORS
export const selectDevelopeProductFormSuggestions = createSelector(
  selectedDevelopeProductFormSuggestions,
  (memorized) => memorized
);

export const selectDevelopeProductFullForm = createSelector(
  selectedDevelopeProductFullForm,
  (memorized) => memorized
);

export const selectDevelopeProductForm = createSelector(
  selectedDevelopeProductForm,
  (memorized) => memorized
);

export const selectDevelopedProductAssets = createSelector(
  selectedDevelopeProductAssets,
  (memorized) => memorized
);

export const selectAllDevelopedProducts = createSelector(
  selectedAllDevelopedProducts,
  (memorized) => memorized
);

export const selectDevelopeProductStatus = createSelector(
  selectedDevelopeProductStatus,
  (memorised) => memorised
);

// assets
export const selectDevelopedProduct = ({ developeProduct }) =>
  developeProduct.developedProduct;

export const selectSingleDevelopeProductStatus = createSelector(
  selectedSingleDevelopeProductStatus,
  (memorised) => memorised
);
