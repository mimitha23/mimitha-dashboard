import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const registerProductValidation = z
  .object({
    isEditable: z.boolean(),

    thumbnail: validations.isOptionalUrl("პროდუქტის მინიატურა"),

    newThumbnail: validations.optionalBase64ImageStr("პროდუქტის მინიატურა"),

    productTypes: z.object({
      ka: validations.isGeorgianLetters("პროდუქტის ტიპის იარლიყი (ka)"),
      en: validations.isLatinLetters("პროდუქტის ტიპის იარლიყი (en)"),
      query: validations.isValidQueryStr("პროდუქტის ტიპის query"),
      caption: validations.isGeorgianLetters("პროდუქტის ტიპი"),
      _id: z.string().nonempty(),
    }),

    gender: z.object({
      ka: validations.isGeorgianLetters("გენდერის იარლიყი (ka)"),
      en: validations.isLatinLetters("გენდერის იარლიყი (en)"),
      query: validations.isValidQueryStr("გენდერის query"),
      caption: validations.isGeorgianLetters("გენდერი"),
      _id: z.string().nonempty(),
    }),

    category: z.object({
      ka: validations.isGeorgianLetters("კატეგორიის იარლიყი (ka)"),
      en: validations.isLatinLetters("კატეგორიის იარლიყი (en)"),
      query: validations.isValidQueryStr("კატეგორიის query"),
      caption: validations.isGeorgianLetters("კატეგორიის იარლიყი (ka)"),
      _id: z.string().nonempty(),
    }),

    productStyles: z
      .array(
        z.object({
          _id: z.string().nonempty(),
          ka: validations.isGeorgianLetters("პროდუქტის სტილი (ka)"),
          en: validations.isLatinLetters("პროდუქტის სტილი (en)"),
          query: validations.isValidQueryStr("პროდუქტის სტილის query"),
          caption: validations.isGeorgianLetters("პროდუქტის სტილი"),
        })
      )
      .min(1),

    seasons: z
      .array(
        z.object({
          _id: z.string().nonempty(),
          ka: validations.isGeorgianLetters("სეზონი (ka)"),
          en: validations.isLatinLetters("სეზონი (en)"),
          query: validations.isValidQueryStr("სეზონის query"),
          caption: validations.isGeorgianLetters("სეზონი"),
        })
      )
      .min(1),

    textures: z
      .array(
        z.object({
          percentage: z.number().min(0.1).max(100),
          texture: z.object({
            _id: z.string().nonempty(),
            ka: validations.isGeorgianLetters("ტექსტურა (ka)"),
            en: validations.isLatinLetters("ტექსტურა (en)"),
            caption: validations.isGeorgianLetters("ტექსტურა"),
          }),
        })
      )
      .min(1)
      .refine(
        (data) => {
          const percentage = data
            .map((item) => +item.percentage)
            .reduce((acc, num) => (acc += num), 0);

          return percentage === 100;
        },
        {
          message:
            "ტექსტურების ჯამური პროცენტული რაოდენობა უნდა შეადგენდეს 100%_ს.",
          path: ["textures"],
        }
      ),

    warnings: z
      .array(
        z.object({
          ka: validations.isGeorgianLetters("გაფრთხილება (ka)"),
          en: validations.isLatinLetters("გაფრთხილება (en)"),
        })
      )
      .min(1),
  })
  .refine(
    (data) => {
      if (!data.thumbnail && !data.newThumbnail) return false;
      else return true;
    },
    {
      message: "გთხოვთ მიუთითეთ პროდუქტის მინიატურა",
      path: ["newThumbnail"],
    }
  );

export default registerProductValidation;
