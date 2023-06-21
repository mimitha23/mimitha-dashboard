import { createSelector } from "@reduxjs/toolkit";

///////////////////////////////////
////////// Create Color //////////
/////////////////////////////////
const selectedCreateColor = ({ createColor }) => ({
  color_ka: createColor.color_ka,
  color_en: createColor.color_en,
  color_hex: createColor.color_hex,
});

const selectedCreateColorStatus = ({ createColor }) => ({
  loading: createColor.status.loading,
  error: createColor.status.error,
  message: createColor.status.message,
});

export const selectCreateColor = createSelector(
  selectedCreateColor,
  (memorised) => memorised
);

export const selectCreateColorStatus = createSelector(
  selectedCreateColorStatus,
  (memorised) => memorised
);

/////////////////////////////////////
////////// Create Variant //////////
///////////////////////////////////
const selectedCreateVariant = ({ createVariant }) => ({
  variantType: createVariant.variantType,
  label_ka: createVariant.label_ka,
  label_en: createVariant.label_en,
  description: createVariant.description,
  icon: createVariant.icon,
});

const selectedCreateVariantStatus = ({ createVariant }) => ({
  loading: createVariant.status.loading,
  error: createVariant.status.error,
  message: createVariant.status.message,
});

export const selectCreateVariant = createSelector(
  selectedCreateVariant,
  (memorised) => memorised
);

export const selectCreateVariantStatus = createSelector(
  selectedCreateVariantStatus,
  (memorised) => memorised
);

/////////////////////////////////////////
////////// Create ProductType //////////
///////////////////////////////////////
const selectedCreateProductType = ({ createProductType }) => ({
  label_ka: createProductType.label_ka,
  label_en: createProductType.label_en,
  query: createProductType.query,
});

const selectedCreateProductTypeStatus = ({ createProductType }) => ({
  loading: createProductType.status.loading,
  error: createProductType.status.error,
  message: createProductType.status.message,
});

export const selectCreateProductType = createSelector(
  selectedCreateProductType,
  (memorised) => memorised
);

export const selectCreateProductTypeStatus = createSelector(
  selectedCreateProductTypeStatus,
  (memorised) => memorised
);
