import { createSelector } from "@reduxjs/toolkit";

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
