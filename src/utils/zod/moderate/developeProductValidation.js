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

  // media properties
  // 1. assets
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

  // 2. thumbnails
  thumbnails: z
    .array(
      z
        .string()
        .refine(
          customValidators.isOptionalURL.validator,
          customValidators.isOptionalURL.message("პროდუქტის ხატულა")
        )
    )
    .min(2)
    .max(2),
  new_thumbnails: z
    .array(
      z
        .string()
        .refine(
          customValidators.isValidBase64ImageStr.validator,
          customValidators.isValidBase64ImageStr.message("პროდუქტის ხატულა")
        )
    )
    .min(2)
    .max(2),
  thumbnails_to_delete: z.array(z.string().url()).min(0),

  // 3. mannequin
  mannequin: z
    .string()
    .refine(
      customValidators.isOptionalURL.validator,
      customValidators.isOptionalURL.message("პროდუქტის მანეკენის ხატულა")
    ),
  new_mannequin: z
    .string()
    .refine(
      customValidators.isValidBase64ImageStr.validator,
      customValidators.isValidBase64ImageStr.message(
        "პროდუქტის მანეკენის მედია ფაილი"
      )
    ),

  // 4. model
  model_video: z
    .string()
    .refine(
      customValidators.isOptionalURL.validator,
      customValidators.isOptionalURL.message("პროდუქტის მოდელის ვიდეო")
    ),
  new_model_video: z
    .any()
    .refine(
      customValidators.isVideoFile.validator,
      customValidators.isVideoFile.message("პროდუქტის მოდელის ვიდეო")
    ),

  // 5. simulation video placing
  simulation_video_placing: z
    .string()
    .refine(
      customValidators.isOptionalURL.validator,
      customValidators.isOptionalURL.message("ედითორის პროდუქტის დადების ვიდეო")
    ),
  new_simulation_video_placing: z
    .any()
    .refine(
      customValidators.isVideoFile.validator,
      customValidators.isVideoFile.message("პროდუქტის მოდელის ვიდეო")
    ),

  // 6. simulation video pick-up
  simulation_video_pick_up: z
    .string()
    .refine(
      customValidators.isOptionalURL.validator,
      customValidators.isOptionalURL.message("ედითორის პროდუქტის აღების ვიდეო")
    ),
  new_simulation_video_pick_up: z
    .any()
    .refine(
      customValidators.isVideoFile.validator,
      customValidators.isVideoFile.message("პროდუქტის მოდელის ვიდეო")
    ),
});

export default developeProductValidation;
