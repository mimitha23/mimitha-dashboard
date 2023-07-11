import { createSelector } from "@reduxjs/toolkit";

// MEMORISED SELECTORS
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
  assets: developeProduct.form.assets,
  filesToUpload: developeProduct.form.filesToUpload,
  filesToDelete: developeProduct.form.filesToDelete,
  isUpdating: developeProduct.isUpdating,
  updatingDevelopedProductId: developeProduct.updatingDevelopedProductId,
});

const selectedDevelopeProductStatus = ({ developeProduct }) => ({
  loading: developeProduct.status.loading,
  error: developeProduct.status.error,
  message: developeProduct.status.message,
});

const selectedSingleDevelopeProductStatus = ({ developeProduct }) => ({
  loading: developeProduct.singleProductStatus.loading,
  error: developeProduct.singleProductStatus.error,
  message: developeProduct.singleProductStatus.message,
});

const selectedDevelopeProductFormSugestions = ({ developeProduct }) => ({
  variants: developeProduct.developeProductFormSugestions.variants,
  colors: developeProduct.developeProductFormSugestions.colors,
  sizes: developeProduct.developeProductFormSugestions.sizes,
});

const selectedAllDevelopedProducts = ({ developeProduct }) =>
  developeProduct.allDevelopedProducts;

// SELECTORS
export const selectDevelopeProductFormSugestions = createSelector(
  selectedDevelopeProductFormSugestions,
  (memorised) => memorised
);

export const selectDevelopeProductForm = createSelector(
  selectedDevelopeProductForm,
  (memorised) => memorised
);

export const selectAllDevelopedProducts = createSelector(
  selectedAllDevelopedProducts,
  (memorised) => memorised
);

export const selectDevelopedProduct = ({ developeProduct }) =>
  developeProduct.developedProduct;

export const selectSingleDevelopeProductStatus = createSelector(
  selectedSingleDevelopeProductStatus,
  (memorised) => memorised
);

export const selectDevelopeProductStatus = createSelector(
  selectedDevelopeProductStatus,
  (memorised) => memorised
);
