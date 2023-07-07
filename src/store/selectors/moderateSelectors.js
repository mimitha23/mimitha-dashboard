import { createSelector } from "@reduxjs/toolkit";

////////////////////////////
////////// Color //////////
//////////////////////////
const selectedColorForm = ({ color }) => ({
  color_ka: color.form.color_ka,
  color_en: color.form.color_en,
  color_hex: color.form.color_hex,
  isUpdating: color.isUpdating,
  updatingColorId: color.updatingColorId,
});

const selectedColorStatus = ({ color }) => ({
  loading: color.status.loading,
  error: color.status.error,
  message: color.status.message,
});

export const selectAllColors = ({ color }) => color.allColors;

export const selectColorForm = createSelector(
  selectedColorForm,
  (memorised) => memorised
);

export const selectColorStatus = createSelector(
  selectedColorStatus,
  (memorised) => memorised
);

//////////////////////////////
////////// Variant //////////
////////////////////////////
const selectedVariantForm = ({ variant }) => ({
  variantType: variant.form.variantType,
  label_ka: variant.form.label_ka,
  label_en: variant.form.label_en,
  description: variant.form.description,
  icon: variant.form.icon,
  newIcon: variant.form.newIcon,
  isUpdating: variant.isUpdating,
  updatingVariantId: variant.updatingVariantId,
});

const selectedVariantStatus = ({ variant }) => ({
  loading: variant.status.loading,
  error: variant.status.error,
  message: variant.status.message,
});

export const selectExistingVariantTypes = ({ variant }) =>
  variant.existingVariantTypes;

export const selectAllVariants = ({ variant }) => variant.allVariants;

export const selectVariantForm = createSelector(
  selectedVariantForm,
  (memorised) => memorised
);

export const selectVariantStatus = createSelector(
  selectedVariantStatus,
  (memorised) => memorised
);

//////////////////////////////////
////////// ProductType //////////
////////////////////////////////
const selectedProductTypeForm = ({ productType }) => ({
  label_ka: productType.form.label_ka,
  label_en: productType.form.label_en,
  query: productType.form.query,
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

///////////////////////////////////
////////// ProductStyle //////////
/////////////////////////////////
const selectedProductStyleForm = ({ productStyle }) => ({
  label_ka: productStyle.form.label_ka,
  label_en: productStyle.form.label_en,
  query: productStyle.form.query,
  isUpdating: productStyle.isUpdating,
  updatingProductStyleId: productStyle.updatingProductStyleId,
});

const selectedProductStyleStatus = ({ productStyle }) => ({
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

//////////////////////////////
////////// Texture //////////
////////////////////////////
const selectedTextureForm = ({ texture }) => ({
  label_ka: texture.form.label_ka,
  label_en: texture.form.label_en,
  isUpdating: texture.isUpdating,
  updatingTextureId: texture.updatingTextureId,
});

const selectedTextureStatus = ({ texture }) => ({
  loading: texture.status.loading,
  error: texture.status.error,
  message: texture.status.message,
});

export const selectAllTextures = ({ texture }) => texture.allTextures;

export const selectTextureForm = createSelector(
  selectedTextureForm,
  (memorised) => memorised
);

export const selectTextureStatus = createSelector(
  selectedTextureStatus,
  (memorised) => memorised
);

//////////////////////////////////////
////////// RegisterProduct //////////
////////////////////////////////////
const selectedRegisterProductForm = ({ registerProduct }) => ({
  productTypes: registerProduct.form.productTypes,
  seasons: registerProduct.form.seasons,
  productStyles: registerProduct.form.productStyles,
  warning: registerProduct.form.warning,
  warnings: registerProduct.form.warnings,
  textures: registerProduct.form.textures,
  gender: registerProduct.form.gender,
  isEditable: registerProduct.form.isEditable,
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
