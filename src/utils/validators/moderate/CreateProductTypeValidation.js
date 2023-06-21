import Validate from "../Validate";
import { availableValidationRules as Rules } from "utils/validators/Validate";

export default class CreateProductTypeValidation extends Validate {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "label_ka",
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "label_en",
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "query",
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

  validate(credentials) {
    const allValidations = Object.keys(credentials).map((key) => {
      const validation = this.validationToExecute.find(
        (validation) => validation.key === key
      );

      const validations = validation.rules.map((rule) => {
        const { hasError, message } = this[rule]({
          value: credentials[key],
          key,
        });

        return { rule, hasError, message };
      });

      return { [key]: validations };
    });

    Object.values(allValidations).forEach((validation) => {
      Object.keys(validation).forEach((key) => {
        const validations = validation[key];
        const validationErrorIndex = validations.findIndex(
          (v) => v.hasError === true
        );

        if (validationErrorIndex >= 0) {
          this.error[key] = {
            hasError: true,
            message: validations[validationErrorIndex].message,
          };

          this.error.hasError = true;
        }
      });
    });

    return this.error;
  }
}
