import { createSelector } from "@reduxjs/toolkit";

const selectedCreateColor = ({ createColor }) => ({
  color_ka: createColor.color_ka,
  color_en: createColor.color_en,
  color_hex: createColor.color_hex,
  status: createColor.status,
});

export const selectCreateColor = createSelector(
  selectedCreateColor,
  (memorised) => memorised
);

const selectedCreateVariant = ({ createVariant }) => ({
  variantType: createVariant.variantType,
  label_ka: createVariant.label_ka,
  label_en: createVariant.label_en,
  description: createVariant.description,
  status: createVariant.status,
});

export const selectCreateVariant = createSelector(
  selectedCreateVariant,
  (memorised) => memorised
);
