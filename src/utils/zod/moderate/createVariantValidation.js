import z from "zod";
import { customValidators } from "../helpers/customValidators";

const createVariantValidation = z.object({
  variantType: z.object({
    caption: z
      .string()
      .nonempty()
      .refine(customValidators.isLatinLetters.validator, {
        message: customValidators.isLatinLetters.message("ვარიანტის ტიპი"),
      })
      .refine(customValidators.hasWhiteSpaceInSequence.validator, {
        message:
          customValidators.hasWhiteSpaceInSequence.message("ვარიანტის ტიპი"),
      }),
    _id: z.string().optional(),
    label_ka: z.string().optional(),
    label_en: z.string().optional(),
  }),
  label_ka: z
    .string()
    .nonempty()
    .refine(customValidators.isGeorgianLetters.validator, {
      message: customValidators.isGeorgianLetters.message(
        "ვარიანტის იარლიყი (ka)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "ვარიანტის იარლიყი (ka)"
      ),
    }),
  label_en: z
    .string()
    .nonempty()
    .refine(customValidators.isLatinLetters.validator, {
      message: customValidators.isLatinLetters.message(
        "ვარიანტის იარლიყი (en)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "ვარიანტის იარლიყი (en)"
      ),
    }),
  description_ka: z
    .string()
    .nonempty()
    .refine(customValidators.isGeorgianLetters.validator, {
      message: customValidators.isGeorgianLetters.message(
        "ვარიანტის აღწერა (ka)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "ვარიანტის აღწერა (ka)"
      ),
    }),
  description_en: z
    .string()
    .nonempty()
    .refine(customValidators.isLatinLetters.validator, {
      message: customValidators.isLatinLetters.message("ვარიანტის აღწერა (en)"),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "ვარიანტის აღწერა (en)"
      ),
    }),
  icon: z.string().url().optional(),
  new_icon: z
    .string()
    .refine(customValidators.isValidBase64Str.validator, {
      message: customValidators.isValidBase64Str.message("ნიშნულის ფაილი"),
    })
    .optional(),
});

export default createVariantValidation;
