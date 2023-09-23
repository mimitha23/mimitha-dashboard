import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const developeProductValidation = z
  .object({
    title_ka: validations.isGeorgianLetters("სათაური (ka)"),
    title_en: validations.isLatinLetters("სათაური (en)"),
    price: z.number().min(1),
    color: z.object({
      ka: validations.isGeorgianLetters("ფერი (ka)"),
      en: validations.isLatinLetters("ფერი (en)"),
      hex: validations.isValidHexColor("ფერი hex ფორმატში"),
      caption: validations.isGeorgianLetters("ფერი"),
      _id: z.string().nonempty(),
    }),
    sizes: z.array(
      z.object({
        amount: z.number().min(1),
        size: z.object({
          ka: validations.isLatinLetters("ზომა (ka)"),
          en: validations.isLatinLetters("ზომა (en)"),
          caption: validations.isLatinLetters("ზომის სათაური"),
          _id: z.string().nonempty(),
        }),
      })
    ),
    variants: z.array(
      z.object({
        _id: z.string().nonempty(),
        type: validations.isLatinLetters("ვარიანტის ტიპი"),
        label_ka: validations.isGeorgianLetters("ვარიანტის იარლიყი (ka)"),
        label_en: validations.isLatinLetters("ვარიანტის იარლიყი (en)"),
        description_ka: validations.isGeorgianLetters("ვარიანტის აღწერა (ka)"),
        description_en: validations.isLatinLetters("ვარიანტის აღწერა (en)"),
        caption: validations.isGeorgianLetters("ვარიანტის სათაური"),
        icon: z.string().url(),
      })
    ),
    description_ka: validations.isGeorgianLetters("აღწერა (ka)"),
    description_en: validations.isLatinLetters("აღწერა (en)"),
    is_public: z.boolean(),
    is_featured: z.boolean(),

    ///////////////////////
    // media properties //
    /////////////////////

    // 1. assets
    assets: z.array(z.string().url().optional()),
    new_assets: z.array(
      validations.isValidBase64ImageStr("პროდუქტის მედია ფაილები").optional()
    ),

    assets_to_delete: validations.optionalUrlsArray(),

    // 2. thumbnails
    thumbnails: z.array(validations.isOptionalUrl("პროდუქტის ხატულა")).max(2),

    front_thumbnail: validations.isOptionalUrl(
      "არსებული პროდუქტის წინა ხატულა"
    ),
    new_front_thumbnail: validations.optionalBase64ImageStr(
      "პროდუქტის წინა ხატულა"
    ),

    back_thumbnail: validations.isOptionalUrl(
      "არსებული პროდუქტის უკანა ხატულა"
    ),
    new_back_thumbnail: validations.optionalBase64ImageStr(
      "პროდუქტის უკანა ხატულა"
    ),

    // 3. mannequin
    mannequin: validations.isOptionalUrl("არსებული პროდუქტის მანეკენის ხატულა"),
    new_mannequin: validations.optionalBase64ImageStr(
      "პროდუქტის მანეკენის მედია ფაილი"
    ),

    // 4. model
    modelVideo: validations.isOptionalUrl("არსებული პროდუქტის მოდელის ვიდეო"),
    new_model_video: validations.isOptionalVideoFile("პროდუქტის მოდელის ვიდეო"),

    // 5. simulation video placing
    placingVideo: validations.isOptionalUrl("არსებული პროდუქტის დადების ვიდეო"),
    new_simulation_video_placing: validations.isOptionalVideoFile(
      "პროდუქტის დადების ვიდეო"
    ),
    // 6. simulation video pick-up
    pickUpVideo: validations.isOptionalUrl("არსებული პროდუქტის აღების ვიდეო"),
    new_simulation_video_pick_up: validations.isOptionalVideoFile(
      "პროდუქტის აღების ვიდეო"
    ),
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
      if (!data.front_thumbnail && !data.new_front_thumbnail) return false;
      else return true;
    },
    {
      message: "გთხოვთ მიუთითოთ პროდუქტის წინა ხატულა",
      path: ["new_front_thumbnail"],
    }
  )
  .refine(
    (data) => {
      if (!data.back_thumbnail && !data.new_back_thumbnail) return false;
      else return true;
    },
    {
      message: "გთხოვთ მიუთითოთ პროდუქტის უკანა ხატულა",
      path: ["new_back_thumbnail"],
    }
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
