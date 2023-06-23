import Validators from "utils/validators/Validators";
import { availableValidationRules as Rules } from "utils/validators/Validators";

export default class CreateProductStyleValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "label_ka",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "label_en",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "query",
        isPrimitive: true,
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
