import z from "zod";
import { customValidators } from "../helpers/customValidators";

const developeProductValidation = z
  .object({
    title_ka: z
      .string()
      .nonempty()
      .refine(customValidators.isGeorgianLetters.validator, {
        message: customValidators.isGeorgianLetters.message("სათაური (ka)"),
      }),
    title_en: z
      .string()
      .nonempty()
      .refine(customValidators.isLatinLetters.validator, {
        message: customValidators.isLatinLetters.message("სათაური (en)"),
      }),
    price: z.number().min(1),
    color: z.object({
      ka: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message("ფერი (ka)"),
        }),
      en: z
        .string()
        .nonempty()
        .refine(customValidators.isLatinLetters.validator, {
          message: customValidators.isLatinLetters.message("ფერი (en)"),
        }),
      hex: z
        .string()
        .nonempty()
        .refine(customValidators.isValidHexColor.validator, {
          message:
            customValidators.isValidHexColor.message("ფერი hex ფორმატში"),
        }),
      caption: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message("ფერი"),
        }),
      _id: z.string().nonempty(),
    }),
    sizes: z.array(
      z.object({
        amount: z.number().min(1),
        size: z.object({
          ka: z
            .string()
            .nonempty()
            .refine(customValidators.isLatinLetters.validator, {
              message: customValidators.isLatinLetters.message("ზომა (ka)"),
            }),
          en: z
            .string()
            .nonempty()
            .refine(customValidators.isLatinLetters.validator, {
              message: customValidators.isLatinLetters.message("ზომა (en)"),
            }),
          caption: z
            .string()
            .nonempty()
            .refine(customValidators.isLatinLetters.validator, {
              message: customValidators.isLatinLetters.message("ზომის სათაური"),
            }),
          _id: z.string().nonempty(),
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
    description_ka: z
      .string()
      .nonempty()
      .refine(customValidators.isGeorgianLetters.validator, {
        message: customValidators.isGeorgianLetters.message("აღწერა (ka)"),
      }),
    description_en: z
      .string()
      .nonempty()
      .refine(customValidators.isLatinLetters.validator, {
        message: customValidators.isLatinLetters.message("აღწერა (en)"),
      }),
    is_public: z.boolean(),
    is_featured: z.boolean(),

    ///////////////////////
    // media properties //
    /////////////////////

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
        .optional()
    ),
    assets_to_delete: z.array(z.string().url().optional()),

    // 2. thumbnails
    thumbnails: z
      .array(
        z
          .string()
          .refine(customValidators.isOptionalURL.validator, {
            message: customValidators.isOptionalURL.message("პროდუქტის ხატულა"),
          })
          .optional()
      )
      .max(2),
    new_thumbnails: z
      .array(
        z
          .string()
          .refine(
            (value) =>
              value === "" || customValidators.isValidBase64ImageStr.validator,
            customValidators.isValidBase64ImageStr.message("პროდუქტის ხატულა")
          )
          .optional()
      )
      .max(2),
    thumbnails_to_delete: z.array(z.string().url().optional()),

    // 3. mannequin
    mannequin: z
      .string()
      .refine(
        customValidators.isOptionalURL.validator,
        customValidators.isOptionalURL.message("პროდუქტის მანეკენის ხატულა")
      )
      .optional(),
    new_mannequin: z
      .string()
      .refine(
        (value) =>
          value === "" || customValidators.isValidBase64ImageStr.validator,
        customValidators.isValidBase64ImageStr.message(
          "პროდუქტის მანეკენის მედია ფაილი"
        )
      )
      .optional(),

    // 4. model
    modelVideo: z
      .string()
      .refine(
        customValidators.isOptionalURL.validator,
        customValidators.isOptionalURL.message("პროდუქტის მოდელის ვიდეო")
      )
      .optional(),
    new_model_video: z
      .any()
      .refine(
        (value) => value === "" || customValidators.isVideoFile.validator,
        customValidators.isVideoFile.message("პროდუქტის მოდელის ვიდეო")
      )
      .optional(),

    // 5. simulation video placing
    placingVideo: z
      .string()
      .refine(
        customValidators.isOptionalURL.validator,
        customValidators.isOptionalURL.message(
          "ედითორის პროდუქტის დადების ვიდეო"
        )
      )
      .optional(),
    new_simulation_video_placing: z
      .any()
      .refine(
        (value) => value === "" || customValidators.isVideoFile.validator,
        customValidators.isVideoFile.message("პროდუქტის მოდელის ვიდეო")
      )
      .optional(),

    // 6. simulation video pick-up
    pickUpVideo: z
      .string()
      .refine(
        customValidators.isOptionalURL.validator,
        customValidators.isOptionalURL.message(
          "ედითორის პროდუქტის აღების ვიდეო"
        )
      )
      .optional(),
    new_simulation_video_pick_up: z
      .any()
      .refine(
        (value) => value === "" || customValidators.isVideoFile.validator,
        customValidators.isVideoFile.message("პროდუქტის მოდელის ვიდეო")
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.assets[0] && !data.new_assets[0]) return false;
      else return true;
    },
    { message: "გთხოვთ მიუთითოთ პროდუქტის ფოტო მასალა", path: ["new_assets"] }
  )
  .refine(
    (data) => {
      if (
        data.thumbnails.some((src) => src === "") &&
        data.new_thumbnails.some((src) => src === "")
      )
        return false;
      else return true;
    },
    { message: "გთხოვთ მიუთითოთ პროდუქტის ხატულები", path: ["new_thumbnails"] }
  )
  .refine(
    (data) => {
      if (!data.mannequin && !data.new_mannequin) return false;
      else return true;
    },
    { message: "გთხოვთ მიუთითოთ მანეკენის ფოტო", path: ["new_mannequin"] }
  )
  .refine(
    (data) => {
      if (!data.modelVideo && !data.new_model_video) return false;
      else return true;
    },
    { message: "გთხოვთ მიუთითოთ მოდელის ვიდეო", path: ["new_model_video"] }
  )
  .refine(
    (data) => {
      if (!data.placingVideo && !data.new_simulation_video_placing)
        return false;
      else return true;
    },
    {
      message: "გთხოვთ მიუთითოთ პროდუქტის დადების ვიდეო",
      path: ["new_simulation_video_placing"],
    }
  )
  .refine(
    (data) => {
      if (!data.pickUpVideo && !data.new_simulation_video_pick_up) return false;
      else return true;
    },
    {
      message: "გთხოვთ მიუთითოთ პროდუქტის აღების ვიდეო",
      path: ["new_simulation_video_pick_up"],
    }
  );

export default developeProductValidation;
