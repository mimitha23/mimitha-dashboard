import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const createTextureValidation = z.object({
  label_ka: validations.isGeorgianLetters("ტექსტურის იარლიყი (ka)"),
  label_en: validations.isLatinLetters("ტექსტურის იარლიყი (en)"),
});

export default createTextureValidation;
