import Validate from "../Validate";

export default class CreateVariantValidation extends Validate {
  constructor() {
    super();
    this.validationToExecute = [
      {
        key: "variantType",
        rules: ["notIsEmpty", "isLatinLetters", "hasWhiteSpaceInSequence"],
      },
      {
        key: "label_ka",
        rules: ["notIsEmpty", "isGeorgianLetters", "hasWhiteSpaceInSequence"],
      },
      {
        key: "label_en",
        rules: ["notIsEmpty", "isLatinLetters", "hasWhiteSpaceInSequence"],
      },
      {
        key: "description",
        rules: ["notIsEmpty"],
      },
      {
        key: "icon",
        rules: ["isFileObject"],
      },
    ];

    this.error = {
      hasError: false,
      variantType: { hasError: false, message: "" },
      label_ka: { hasError: false, message: "" },
      label_en: { hasError: false, message: "" },
      description: { hasError: false, message: "" },
      icon: { hasError: false, message: "" },
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