import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const createProductTypeValidation = z.object({
  label_ka: validations.isGeorgianLetters("პროდუქტის ტიპის იარლიყი (ka)"),
  label_en: validations.isLatinLetters("პროდუქტის ტიპის იარლიყი (en)"),
});

export default createProductTypeValidation;
