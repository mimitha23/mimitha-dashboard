import { createSelector } from "@reduxjs/toolkit";

// MEMORISED SELECTORS
const selectedDevelopeProductFormSugestions = ({ developeProduct }) => ({
  variants: developeProduct.developeProductFormSugestions.variants,
  colors: developeProduct.developeProductFormSugestions.colors,
  sizes: developeProduct.developeProductFormSugestions.sizes,
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
export const selectDevelopeProductFormSugestions = createSelector(
  selectedDevelopeProductFormSugestions,
  (memorised) => memorised
);

export const selectDevelopeProductFullForm = createSelector(
  selectedDevelopeProductFullForm,
  (memorised) => memorised
);

export const selectDevelopeProductForm = createSelector(
  selectedDevelopeProductForm,
  (memorised) => memorised
);

export const selectDevelopedProductAssets = createSelector(
  selectedDevelopeProductAssets,
  (memorised) => memorised
);

export const selectAllDevelopedProducts = createSelector(
  selectedAllDevelopedProducts,
  (memorised) => memorised
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
