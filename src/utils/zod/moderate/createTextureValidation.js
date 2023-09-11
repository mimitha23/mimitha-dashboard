import z from "zod";
import { customValidators } from "utils/zod/helpers/customValidators";

const createTextureValidation = z.object({
  label_ka: z
    .string()
    .nonempty()
    .refine(customValidators.isGeorgianLetters.validator, {
      message: customValidators.isGeorgianLetters.message(
        "პროდუქტის ტიპის იარლიყი (ka)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "პროდუქტის ტიპის იარლიყი (ka)"
      ),
    }),
  label_en: z
    .string()
    .nonempty()
    .refine(customValidators.isLatinLetters.validator, {
      message: customValidators.isLatinLetters.message(
        "პროდუქტის ტიპის იარლიყი (en)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "პროდუქტის ტიპის იარლიყი (en)"
      ),
    }),
});

export default createTextureValidation;
