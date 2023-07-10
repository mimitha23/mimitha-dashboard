/* eslint-disable array-callback-return */
const availableValidationRules = {
  notIsEmpty: "notIsEmpty",
  isNumber: "isNumber",
  isOnlyGeorgianLetters: "isOnlyGeorgianLetters",
  isGeorgianLetters: "isGeorgianLetters",
  isOnlyLatinLetters: "isOnlyLatinLetters",
  isLatinLetters: "isLatinLetters",
  isValidHexColor: "isValidHexColor",
  isImageFile: "isImageFile",
  hasWhiteSpaceInSequence: "hasWhiteSpaceInSequence",
  isEmptyObject: "isEmptyObject",
  isEmptyArray: "isEmptyArray",
  isBoolean: "isBoolean",
};

const validationType = {
  isPrimitivesArray: "isPrimitivesArray",
  isObjectsArray: "isObjectsArray",
  isObject: "isObject",
  isPrimitive: "isPrimitive",
};

export default class Validate {
  validate(credentials) {
    /**
     * keys from credentials which are predefined in specific validation class too
     * to ensure that we are not validating unexpected fields
     */
    const validateableKeys = this.getValidateableKeys(credentials);

    // all described fields validations
    const allFieldsValidations = validateableKeys.map((key) => {
      // get field validation description block
      const fieldToValidate = this.getFieldToValidate(key);

      // validate all fields based on described types ↓

      // validate primitives
      if (fieldToValidate.validationType === validationType.isPrimitivesArray)
        return {
          [key]: this.validatePrimitivesArray({
            key,
            credentials,
            rules: fieldToValidate.rules,
          }),
        };
      else if (fieldToValidate.validationType === validationType.isObjectsArray)
        return {
          [key]: this.validateObjectsArray({
            key,
            credentials: credentials[key],
            fieldsToValidate: fieldToValidate.fieldsToValidate,
          }),
        };
      else if (fieldToValidate.validationType === validationType.isObject)
        return {
          [key]: this.validateObject({
            key,
            credentials,
            fieldsToValidate: fieldToValidate.fieldsToValidate,
          }),
        };
      else if (fieldToValidate.validationType === validationType.isPrimitive)
        return {
          [key]: this.validatePrimitive({
            key,
            credentials,
            rules: fieldToValidate.rules,
          }),
        };
      else return [];
    });

    // set all described fields validations in appropriate error object
    Object.values(allFieldsValidations).forEach((fieldValidation) => {
      const isValidFieldValidation = fieldValidation instanceof Object;

      if (!isValidFieldValidation) return;

      const fieldValidationKey = Object.keys(fieldValidation)[0];
      const fieldToValidate = this.getFieldToValidate(fieldValidationKey);

      const generateSetErrorArgs = () => ({
        key: fieldValidationKey,
        validationsArray: fieldValidation[fieldValidationKey],
      });

      if (fieldToValidate.validationType === validationType.isPrimitivesArray)
        this.setPrimitivesArrayError(generateSetErrorArgs());
      else if (fieldToValidate.validationType === validationType.isObjectsArray)
        this.setObjectArrayError(generateSetErrorArgs());
      else if (fieldToValidate.validationType === validationType.isObject)
        this.setObjectError(generateSetErrorArgs());
      else if (fieldToValidate.validationType === validationType.isPrimitive)
        this.setPrimitivesError(generateSetErrorArgs());
    });

    return this;
  }
}

function extractObjectsArrayError(errors) {
  if (!errors) return {};

  const temp = {};

  errors.forEach((error) => {
    temp[error.key] = {
      hasError: error.hasError,
      message: error.message,
    };
  });

  return temp;
}

export { availableValidationRules, validationType, extractObjectsArrayError };
