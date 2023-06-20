import { createSelector } from "@reduxjs/toolkit";

const selectedCreateColor = ({ createColor }) => ({
  color_ka: createColor.color_ka,
  color_en: createColor.color_en,
  color_hex: createColor.color_hex,
});

export const selectCreateColor = createSelector(
  selectedCreateColor,
  (memorised) => memorised
);
