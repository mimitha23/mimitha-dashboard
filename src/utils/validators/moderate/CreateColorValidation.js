import {
  validationType,
  availableValidationRules as Rules,
} from "utils/validators/helpers/Validate";
import Validators from "utils/validators/Validators";

export default class CreateColorValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "color_ka",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "color_en",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "color_hex",
        validationType: validationType.isPrimitive,
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
