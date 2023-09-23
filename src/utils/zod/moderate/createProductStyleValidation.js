import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const createProductStyleValidation = z.object({
  label_ka: validations.isGeorgianLetters("პროდუქტის სტილის იარლიყი (ka)"),
  label_en: validations.isLatinLetters("პროდუქტის სტილის იარლიყი (en)"),
});

export default createProductStyleValidation;
