import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const createColorValidation = z.object({
  color_ka: validations.isGeorgianLetters("ფერი (ka)"),
  color_en: validations.isLatinLetters("ფერი (en)"),
  color_hex: validations.isValidHexColor("ფერი hex ფორმატში"),
});

export default createColorValidation;
