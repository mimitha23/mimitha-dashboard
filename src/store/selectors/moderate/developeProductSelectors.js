import { createSelector } from "@reduxjs/toolkit";

// MEMORIZED SELECTORS
const selectedDevelopeProductFormSuggestions = ({ developeProduct }) => ({
  variants: developeProduct.developeProductFormSuggestions.variants,
  colors: developeProduct.developeProductFormSuggestions.colors,
  sizes: developeProduct.developeProductFormSuggestions.sizes,
});

const selectedDevelopeProductForm = ({ developeProduct }) => ({
  title_ka: developeProduct.form.title_ka,
  title_en: developeProduct.form.title_en,
  price: developeProduct.form.price,
  color: developeProduct.form.color,
  sizes: developeProduct.form.sizes,
  variants: developeProduct.form.variants,
  description_ka: developeProduct.form.description_ka,
  description_en: developeProduct.form.description_en,
  is_public: developeProduct.form.is_public,
  is_featured: developeProduct.form.is_featured,
  isUpdating: developeProduct.isUpdating,
  updatingDevelopedProductId: developeProduct.updatingDevelopedProductId,
  assets: developeProduct.form.assets,
  new_assets: developeProduct.form.new_assets,
  assets_to_delete: developeProduct.form.assets_to_delete,
});

const selectedDevelopeProductStatus = ({ developeProduct }) => ({
  stage: developeProduct.status.stage,
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

export const selectDevelopeProductForm = createSelector(
  selectedDevelopeProductForm,
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

export const selectDevelopedProduct = ({ developeProduct }) =>
  developeProduct.developedProduct;

export const selectSingleDevelopeProductStatus = createSelector(
  selectedSingleDevelopeProductStatus,
  (memorised) => memorised
);
