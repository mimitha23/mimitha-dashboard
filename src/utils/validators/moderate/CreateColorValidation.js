import Validators from "utils/validators/Validators";
import { availableValidationRules as Rules } from "utils/validators/Validators";

export default class CreateColorValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "color_ka",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "color_en",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "color_hex",
        isPrimitive: true,
        rules: [Rules.notIsEmpty, Rules.isValidHexColor],
      },
    ];

    this.error = {
      hasError: false,
      color_ka: { hasError: false, message: "" },
      color_en: { hasError: false, message: "" },
      color_hex: { hasError: false, message: "" },
    };
  }
}
