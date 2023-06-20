import Validate from "../Validate";

export default class CreateColorValidation extends Validate {
  constructor() {
    super();
    this.validationToExecute = [
      {
        key: "color_ka",
        rules: ["notIsEmpty", "isOnlyGeorgianLetters"],
      },
      {
        key: "color_en",
        rules: ["notIsEmpty", "isOnlyLatinLetters"],
      },
      {
        key: "color_hex",
        rules: ["notIsEmpty", "isValidHexColor"],
      },
    ];

    this.error = {
      hasError: false,
      color_ka: { hasError: false, message: "" },
      color_en: { hasError: false, message: "" },
      color_hex: { hasError: false, message: "" },
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
