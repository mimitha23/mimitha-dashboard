import z from "zod";
import { customValidators } from "utils/zod/helpers/customValidators";

const registerProductValidation = z
  .object({
    isEditable: z.boolean(),

    thumbnail: z
      .string()
      .refine(customValidators.isOptionalURL.validator, {
        message: customValidators.isOptionalURL.message("პროდუქტის მინიატურა"),
      })
      .optional(),

    newThumbnail: z
      .string()
      .refine(
        (value) =>
          value === "" ||
          customValidators.isValidBase64ImageStr.validator(value),
        {
          message: customValidators.isValidBase64ImageStr.message(
            "პროდუქტის 2 მინიატურა"
          ),
        }
      )
      .optional(),

    productTypes: z.object({
      ka: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message(
            "პროდუქტის ტიპის იარლიყი (ka)"
          ),
        }),
      en: z
        .string()
        .nonempty()
        .refine(customValidators.isLatinLetters.validator, {
          message: customValidators.isLatinLetters.message(
            "პროდუქტის ტიპის იარლიყი (en)"
          ),
        }),
      query: z
        .string()
        .nonempty()
        .refine(customValidators.isValidQueryStr.validator, {
          message: customValidators.isValidQueryStr.message(
            "პროდუქტის ტიპის query"
          ),
        }),
      caption: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message("პროდუქტის ტიპი"),
        }),
      _id: z.string().nonempty(),
    }),

    gender: z.object({
      ka: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message(
            "გენდერის იარლიყი (ka)"
          ),
        }),
      en: z
        .string()
        .nonempty()
        .refine(customValidators.isLatinLetters.validator, {
          message: customValidators.isLatinLetters.message(
            "გენდერის იარლიყი (en)"
          ),
        }),
      query: z
        .string()
        .nonempty()
        .refine(customValidators.isValidQueryStr.validator, {
          message: customValidators.isValidQueryStr.message("გენდერის query"),
        }),
      caption: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message("გენდერის"),
        }),
      _id: z.string().nonempty(),
    }),

    category: z.object({
      ka: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message(
            "კატეგორიის იარლიყი (ka)"
          ),
        }),
      en: z
        .string()
        .nonempty()
        .refine(customValidators.isLatinLetters.validator, {
          message: customValidators.isLatinLetters.message(
            "კატეგორიის იარლიყი (en)"
          ),
        }),
      query: z
        .string()
        .nonempty()
        .refine(customValidators.isValidQueryStr.validator, {
          message: customValidators.isValidQueryStr.message("კატეგორიის query"),
        }),
      caption: z
        .string()
        .nonempty()
        .refine(customValidators.isGeorgianLetters.validator, {
          message: customValidators.isGeorgianLetters.message(
            "კატეგორიის იარლიყი (ka)"
          ),
        }),
      _id: z.string().nonempty(),
    }),

    productStyles: z
      .array(
        z.object({
          _id: z.string().nonempty(),
          ka: z
            .string()
            .nonempty()
            .refine(customValidators.isGeorgianLetters.validator, {
              message: customValidators.isGeorgianLetters.message(
                "პროდუქტის სტილი (ka)"
              ),
            }),
          en: z
            .string()
            .nonempty()
            .refine(customValidators.isLatinLetters.validator, {
              message: customValidators.isLatinLetters.message(
                "პროდუქტის სტილი (en)"
              ),
            }),
          query: z
            .string()
            .nonempty()
            .refine(customValidators.isValidQueryStr.validator, {
              message: customValidators.isValidQueryStr.message(
                "პროდუქტის სტილის query"
              ),
            }),
          caption: z
            .string()
            .nonempty()
            .refine(customValidators.isGeorgianLetters.validator, {
              message:
                customValidators.isGeorgianLetters.message("პროდუქტის სტილი"),
            }),
        })
      )
      .min(1),

    seasons: z
      .array(
        z.object({
          _id: z.string().nonempty(),
          ka: z
            .string()
            .nonempty()
            .refine(customValidators.isGeorgianLetters.validator, {
              message:
                customValidators.isGeorgianLetters.message("სეზონი (ka)"),
            }),
          en: z
            .string()
            .nonempty()
            .refine(customValidators.isLatinLetters.validator, {
              message: customValidators.isLatinLetters.message("სეზონი (en)"),
            }),
          query: z
            .string()
            .nonempty()
            .refine(customValidators.isValidQueryStr.validator, {
              message:
                customValidators.isValidQueryStr.message("სეზონის query"),
            }),
          caption: z
            .string()
            .nonempty()
            .refine(customValidators.isGeorgianLetters.validator, {
              message: customValidators.isGeorgianLetters.message("სეზონი"),
            }),
        })
      )
      .min(1),

    textures: z
      .array(
        z.object({
          percentage: z.number().min(0.1).max(100),
          texture: z.object({
            _id: z.string().nonempty(),
            ka: z
              .string()
              .nonempty()
              .refine(customValidators.isGeorgianLetters.validator, {
                message:
                  customValidators.isGeorgianLetters.message("ტექსტურა (ka)"),
              }),
            en: z
              .string()
              .nonempty()
              .refine(customValidators.isLatinLetters.validator, {
                message:
                  customValidators.isLatinLetters.message("ტექსტურა (en)"),
              }),
            caption: z
              .string()
              .nonempty()
              .refine(customValidators.isGeorgianLetters.validator, {
                message: customValidators.isGeorgianLetters.message("ტექსტურა"),
              }),
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
          ka: z
            .string()
            .nonempty()
            .refine(customValidators.isGeorgianLetters.validator, {
              message:
                customValidators.isGeorgianLetters.message("გაფრთხილება (ka)"),
            }),
          en: z
            .string()
            .nonempty()
            .refine(customValidators.isLatinLetters.validator, {
              message:
                customValidators.isLatinLetters.message("გაფრთხილება (en)"),
            }),
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
