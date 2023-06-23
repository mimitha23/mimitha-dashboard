import Validate from "./Validate";

export default class ValidateHelpers extends Validate {
  // UTILS
  getDescribedKeys() {
    if (!Array.isArray(this.validationToExecute)) return [];

    return this.validationToExecute.map(
      (describedValidation) => describedValidation.key
    );
  }

  getValidateableKeys(credentials) {
    if (!credentials) return [];

    const describedKeys = this.getDescribedKeys();

    return Object.keys(credentials).filter((key) =>
      describedKeys.includes(key)
    );
  }

  getFieldToValidate(key) {
    return this.validationToExecute.find(
      (validation) => validation.key === key
    );
  }

  // VALIDATE BY DATA TYPE
  validatePrimitive({ key, rules, credentials }) {
    return rules.map((rule) => {
      const { hasError, message } = this[rule]({
        value: credentials[key],
        key,
      });

      return { rule, hasError, message };
    });
  }

  validatePrimitivesArray({ key, rules, credentials }) {
    if (!Array.isArray(credentials[key]) || !credentials[key][0])
      return [
        {
          hasError: true,
          rule: "isEmptyArray",
          message: `გთხოვთ შეიყვანოთ ${key}`,
        },
      ];

    const executedValidations = credentials[key].map((item) =>
      this.validatePrimitive({ key, rules, credentials: { [key]: item } })
    );

    const normalisedValidationsArray = [];

    executedValidations.forEach((arrayItemValidations, i) => {
      const validationErrorIndex = arrayItemValidations.findIndex(
        (v) => v.hasError === true
      );

      if (validationErrorIndex >= 0) {
        normalisedValidationsArray.push({
          hasError: true,
          itemIndex: i,
          message: executedValidations[i][validationErrorIndex].message,
        });
      }
    });

    return normalisedValidationsArray;
  }

  // SET ERRORS
  setPrimitivesError({ validationsArray, key }) {
    const validationErrorIndex = validationsArray.findIndex(
      (v) => v.hasError === true
    );

    if (validationErrorIndex >= 0) {
      this.error[key] = {
        hasError: true,
        message: validationsArray[validationErrorIndex].message,
      };

      this.error.hasError = true;
    }
  }

  setPrimitivesArrayError({ validationsArray, key }) {
    const emptyArrayError =
      validationsArray.length === 1 &&
      validationsArray[0].rule === "isEmptyArray";

    this.error[key] = {
      hasError: true,
      error: emptyArrayError ? validationsArray[0].message : "",
      itemErrors: emptyArrayError ? [] : validationsArray,
    };
  }
}
