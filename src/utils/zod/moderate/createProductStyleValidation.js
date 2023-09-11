import z from "zod";
import { customValidators } from "utils/zod/helpers/customValidators";

const createProductStyleValidation = z.object({
  label_ka: z
    .string()
    .nonempty()
    .refine(customValidators.isGeorgianLetters.validator, {
      message: customValidators.isGeorgianLetters.message(
        "პროდუქტის სტილის იარლიყი (ka)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "პროდუქტის სტილის იარლიყი (ka)"
      ),
    }),
  label_en: z
    .string()
    .nonempty()
    .refine(customValidators.isLatinLetters.validator, {
      message: customValidators.isLatinLetters.message(
        "პროდუქტის სტილის იარლიყი (en)"
      ),
    })
    .refine(customValidators.hasWhiteSpaceInSequence.validator, {
      message: customValidators.hasWhiteSpaceInSequence.message(
        "პროდუქტის სტილის იარლიყი (en)"
      ),
    }),
});

export default createProductStyleValidation;
