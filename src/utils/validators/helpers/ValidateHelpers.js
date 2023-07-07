import Validate from "./Validate";

export default class ValidateHelpers extends Validate {
  // VALIDATE BY DATA TYPE
  validatePrimitive({ key, rules, credentials }) {
    return rules.map((rule) => {
      const { hasError, message } = this[rule]({
        key,
        value: credentials[key],
      });

      return { rule, hasError, message };
    });
  }

  validatePrimitivesArray({ key, rules, credentials }) {
    if (!Array.isArray(credentials[key]) || !credentials[key][0])
      return this.generateEmptyArrayError(key);

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

  validateObjectsArray({ key, fieldsToValidate, credentials }) {
    if (!Array.isArray(credentials) || !credentials[0])
      return this.generateEmptyArrayError(key);

    const allExecutedValidations = credentials.map((field) => {
      return this.validateSingleObject({ field, fieldsToValidate });
    });

    const normalisedValidationsArray = [];

    allExecutedValidations.forEach((executedValidations) => {
      const normalised = this.normaliseObjectError(executedValidations);

      normalisedValidationsArray.push(normalised);
    });

    return normalisedValidationsArray;
  }

  validateObject({ key, fieldsToValidate, credentials }) {
    const allExecutedValidations = this.validateSingleObject({
      field: credentials[key],
      fieldsToValidate,
    });

    return this.normaliseObjectError(allExecutedValidations);
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
    const emptyArrayError = this.isEmptyArrayError(validationsArray);

    this.error[key] = {
      hasError: true,
      error: emptyArrayError ? validationsArray[0].message : "",
      itemErrors: emptyArrayError ? [] : validationsArray,
    };
  }

  setObjectArrayError({ validationsArray, key }) {
    const emptyArrayError = this.isEmptyArrayError(validationsArray);

    const hasError = Array.isArray(validationsArray[0])
      ? validationsArray[0].some((validation) => validation.hasError)
      : validationsArray.hasError;

    this.error[key] = {
      hasError: hasError,
      error: emptyArrayError ? validationsArray[0]?.message : "",
      itemErrors: emptyArrayError ? [] : validationsArray,
    };

    this.error.hasError = hasError;
  }

  setObjectError({ validationsArray, key }) {
    const hasError = validationsArray.some((validation) => validation.hasError);

    this.error[key] = {
      error: "",
      itemErrors: validationsArray,
      hasError: hasError,
    };

    this.error.hasError = hasError;
  }

  // UTILS

  /**
   * get keys which are described in specific validation class, e.g 'RegisterProductValidation'
   */
  getDescribedKeys() {
    if (!Array.isArray(this.validationToExecute)) return [];

    return this.validationToExecute.map(
      (describedValidation) => describedValidation.key
    );
  }

  /**
   * get only keys which are described in specific validation class from credentials.
   * with help of this if credentials includes property which is not described will be excluded.
   * @param {Object} credentials any{}
   * @returns
   */
  getValidateableKeys(credentials) {
    if (!credentials) return [];

    const describedKeys = this.getDescribedKeys();

    return Object.keys(credentials).filter((key) =>
      describedKeys.includes(key)
    );
  }

  /**
   * finds specific field validation description described in 'validationToExecute'
   * @param {string} key
   * @returns
   */
  getFieldToValidate(key) {
    return this.validationToExecute.find(
      (validation) => validation.key === key
    );
  }

  splitToUpperCase(str) {
    return str
      .split("_")
      .join(" ")
      .split("-")
      .join(" ")
      .split(/(?=[A-Z])/)
      .map((fragment) => fragment.toLowerCase())
      .join(" ");
  }

  validateSingleObject({ field, fieldsToValidate }) {
    const propertiesToValidate = fieldsToValidate.map((block) => block.field);

    return propertiesToValidate.map((key) => ({
      field: key,
      executions: [
        ...this.validatePrimitive({
          key,
          credentials: field,
          rules: fieldsToValidate.find((block) => block.field === key).rules,
        }),
      ],
    }));
  }

  generateEmptyArrayError(key) {
    return [
      {
        hasError: true,
        rule: "isEmptyArray",
        message: `გთხოვთ შეიყვანოთ ${this.splitToUpperCase(key)}`,
      },
    ];
  }

  isEmptyArrayError(validationsArray) {
    return (
      validationsArray.length === 1 &&
      validationsArray[0].rule === "isEmptyArray"
    );
  }

  normaliseObjectError(executedValidations) {
    return executedValidations.flatMap((executedValidation) => {
      const temp = [];

      const errorIndex = executedValidation.executions.findIndex(
        (exec) => exec.hasError
      );

      temp.push({
        key: executedValidation.field,
        hasError: executedValidation.executions[errorIndex]?.hasError || false,
        message: executedValidation.executions[errorIndex]?.message || "",
      });

      return temp;
    });
  }
}
