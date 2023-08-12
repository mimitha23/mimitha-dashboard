import { createSelector } from "@reduxjs/toolkit";

const selectedVariantForm = ({ variant }) => ({
  variantType: variant.form.variantType,
  label_ka: variant.form.label_ka,
  label_en: variant.form.label_en,
  description_ka: variant.form.description_ka,
  description_en: variant.form.description_en,
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
