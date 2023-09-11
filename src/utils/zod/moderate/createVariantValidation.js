import z from "zod";
import { customValidators } from "utils/zod/helpers/customValidators";

const createVariantValidation = z
  .object({
    variant_type: z.object({
      caption: z
        .string()
        .nonempty()
        .trim()
        .toLowerCase()
        .refine(customValidators.isLatinLetters.validator, {
          message: customValidators.isLatinLetters.message("ვარიანტის ტიპი"),
        })
        .refine(customValidators.hasWhiteSpaceInSequence.validator, {
          message:
            customValidators.hasWhiteSpaceInSequence.message("ვარიანტის ტიპი"),
        }),
      _id: z.string().optional(),
      label_ka: z.string().trim().toLowerCase().optional(),
      label_en: z.string().trim().toLowerCase().optional(),
    }),
    label_ka: z
      .string()
      .nonempty()
      .trim()
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
      .trim()
      .toLowerCase()
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
      .trim()
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
      .trim()
      .toLowerCase()
      .refine(customValidators.isLatinLetters.validator, {
        message: customValidators.isLatinLetters.message(
          "ვარიანტის აღწერა (en)"
        ),
      })
      .refine(customValidators.hasWhiteSpaceInSequence.validator, {
        message: customValidators.hasWhiteSpaceInSequence.message(
          "ვარიანტის აღწერა (en)"
        ),
      }),
    icon: z
      .string()
      .refine(customValidators.isOptionalURL.validator, {
        message: customValidators.isOptionalURL.message("icon"),
      })
      .optional(),
    new_icon: z
      .string()
      .refine(
        (value) =>
          value === "" ||
          customValidators.isValidBase64ImageStr.validator(value),
        {
          message:
            customValidators.isValidBase64ImageStr.message("ნიშნულის ფაილი"),
        }
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.icon && !data.new_icon) return false;
      else return true;
    },
    {
      message: "გთხოვთ მიუთითეთ ნიშნულის ფაილი",
      path: ["new_icon"],
    }
  );

export default createVariantValidation;
