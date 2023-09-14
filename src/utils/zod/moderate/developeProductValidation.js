import z from "zod";
import { customValidators } from "../helpers/customValidators";

const developeProductValidation = z.object({
  title_ka: z.string(),
  title_en: z.string(),
  price: z.number(),
  color: z.object({
    ka: z.string(),
    en: z.string(),
    _id: z.string(),
    caption: z.string(),
  }),
  sizes: z.array(
    z.object({
      amount: z.number(),
      size: z.object({
        ka: z.string(),
        en: z.string(),
        _id: z.string(),
        caption: z.string(),
      }),
    })
  ),
  variants: z.array(
    z.object({
      _id: z.string(),
      type: z.string(),
      label_ka: z.string(),
      label_en: z.string(),
      description_ka: z.string(),
      description_en: z.string(),
      icon: z.string(),
      caption: z.string(),
    })
  ),
  description_ka: z.string(),
  description_en: z.string(),
  is_public: z.boolean(),
  is_featured: z.boolean(),
  assets: z.array(z.string().url().optional()),
  new_assets: z.array(
    z
      .string()
      .refine(
        customValidators.isValidBase64ImageStr.validator,
        customValidators.isValidBase64ImageStr.message(
          "პროდუქტის მედია ფაილები"
        )
      )
  ),
  assets_to_delete: z.array(z.string().url().optional()),
  thumbnails: z.array(z.string().url().optional()),
  new_thumbnails: z.array(
    z
      .string()
      .refine(
        customValidators.isValidBase64ImageStr.validator,
        customValidators.isValidBase64ImageStr.message(
          "პროდუქტის მედია ფაილები"
        )
      )
  ),
  thumbnails_to_delete: z.array(z.string().url().optional()),
});

export default developeProductValidation;
