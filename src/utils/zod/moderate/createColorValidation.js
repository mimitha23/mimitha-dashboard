import z from "zod";
import { customValidators } from "../helpers/customValidators";

const createColorValidation = z.object({
  color_ka: z
    .string()
    .nonempty()
    .refine(customValidators.isGeorgianLetters.validator, {
      message: customValidators.isGeorgianLetters.message("ფერი (ka)"),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message("ფერი (ka)"),
    }),
  color_en: z
    .string()
    .nonempty()
    .refine(customValidators.isLatinLetters.validator, {
      message: customValidators.isLatinLetters.message("ფერი (en)"),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message("ფერი (en)"),
    }),
  color_hex: z
    .string()
    .nonempty()
    .refine(customValidators.isValidHexColor.validator, {
      message: customValidators.isValidHexColor.message("ფერი (en)"),
    }),
});

export default createColorValidation;
