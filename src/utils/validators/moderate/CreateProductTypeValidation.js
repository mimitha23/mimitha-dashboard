import {
  validationType,
  availableValidationRules as Rules,
} from "utils/validators/helpers/Validate";
import Validators from "utils/validators/Validators";

export default class CreateProductTypeValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "label_ka",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "label_en",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
    ];

    this.error = {
      hasError: false,
      label_ka: { hasError: false, message: "" },
      label_en: { hasError: false, message: "" },
      query: { hasError: false, message: "" },
    };
  }
}
