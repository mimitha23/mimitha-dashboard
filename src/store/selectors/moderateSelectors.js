import { createSelector } from "@reduxjs/toolkit";

///////////////////////////////////
////////// Create Color //////////
/////////////////////////////////
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

/////////////////////////////////////
////////// Create Variant //////////
///////////////////////////////////
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

/////////////////////////////////////////
////////// Create ProductType //////////
///////////////////////////////////////
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

/////////////////////////////////////////
////////// Create ProductStyle //////////
///////////////////////////////////////
const selectedCreateProductStyle = ({ createProductStyle }) => ({
  label_ka: createProductStyle.label_ka,
  label_en: createProductStyle.label_en,
  query: createProductStyle.query,
});

const selectedCreateProductStyleStatus = ({ createProductStyle }) => ({
  loading: createProductStyle.status.loading,
  error: createProductStyle.status.error,
  message: createProductStyle.status.message,
});

export const selectCreateProductStyle = createSelector(
  selectedCreateProductStyle,
  (memorised) => memorised
);

export const selectCreateProductStyleStatus = createSelector(
  selectedCreateProductStyleStatus,
  (memorised) => memorised
);

/////////////////////////////////////////
////////// Register Product //////////
///////////////////////////////////////
const selectedRegisterProduct = ({ registerProduct }) => ({
  productType: registerProduct.productType,
  seasons: registerProduct.seasons,
  styles: registerProduct.styles,
  warnings: registerProduct.warnings,
  texture: registerProduct.texture,
  gender: registerProduct.gender,
});

const selectedRegisterProductStatus = ({ registerProduct }) => ({
  loading: registerProduct.status.loading,
  error: registerProduct.status.error,
  message: registerProduct.status.message,
});

export const selectRegisterProduct = createSelector(
  selectedRegisterProduct,
  (memorised) => memorised
);

export const selectRegisterProductStatus = createSelector(
  selectedRegisterProductStatus,
  (memorised) => memorised
);
