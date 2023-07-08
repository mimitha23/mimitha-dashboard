import { createSelector } from "@reduxjs/toolkit";

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
