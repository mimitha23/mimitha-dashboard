import z from "zod";
import { customValidators } from "utils/zod/helpers/customValidators";

const registerProductValidation = z.object({
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

  isEditable: z.boolean(),

  thumbnail: z.string(),
});

export default registerProductValidation;
