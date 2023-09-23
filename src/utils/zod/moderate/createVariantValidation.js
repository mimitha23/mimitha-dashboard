import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const createVariantValidation = z
  .object({
    variant_type: z.object({
      caption: validations.isLatinLetters("ვარიანტის ტიპი"),
      _id: z.string().optional(),
      label_ka: validations.isGeorgianLetters("ვარიანტის იარლიყი (ka)"),
      label_en: validations.isLatinLetters("ვარიანტის იარლიყი (en)"),
    }),
    label_ka: validations.isGeorgianLetters("ვარიანტის იარლიყი (ka)"),
    label_en: validations.isLatinLetters("ვარიანტის იარლიყი (en)"),
    description_ka: validations.isGeorgianLetters("ვარიანტის  აღწერა (ka)"),
    description_en: validations.isLatinLetters("ვარიანტის აღწერა (en)"),
    icon: validations.isOptionalUrl("ვარიანტის ხატულა"),
    new_icon: validations.optionalBase64ImageStr("ვარიანტის ხატულა"),
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
