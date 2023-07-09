import { createSelector } from "@reduxjs/toolkit";

const selectedDevelopeProductForm = ({ developeProduct }) => ({
  title_ka: developeProduct.form.title_ka,
  title_en: developeProduct.form.title_en,
  price: developeProduct.form.price,
  color: developeProduct.form.color,
  sizes: developeProduct.form.sizes,
  variants: developeProduct.form.vaiants,
  description_ka: developeProduct.form.description_ka,
  description_en: developeProduct.form.description_en,
  assets: developeProduct.form.assets,
  isUpdating: developeProduct.isUpdating,
  updatingDevelopedProductId: developeProduct.updatingDevelopedProductId,
});

const selectedDevelopeProductStatus = ({ developeProduct }) => ({
  loading: developeProduct.loading,
  error: developeProduct.error,
  message: developeProduct.message,
});

const selectedDevelopeProductFormSugestions = ({ developeProduct }) => ({
  variants: developeProduct.developeProductFormSugestions.variants,
  colors: developeProduct.developeProductFormSugestions.colors,
  sizes: developeProduct.developeProductFormSugestions.sizes,
});

export const selectDevelopeProductFormSugestions = createSelector(
  selectedDevelopeProductFormSugestions,
  (memorised) => memorised
);

export const selectDevelopeProductForm = createSelector(
  selectedDevelopeProductForm,
  (memorised) => memorised
);

export const selectDevelopeProductStatus = createSelector(
  selectedDevelopeProductStatus,
  (memorised) => memorised
);
