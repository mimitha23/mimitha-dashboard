/* eslint-disable array-callback-return */
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
      if (fieldToValidate.isPrimitivesArray) {
        const fieldValidationsArr = this.validatePrimitivesArray({
          key,
          credentials,
          rules: fieldToValidate.rules,
        });

        return { [key]: fieldValidationsArr };
        // validate objects array
      } else if (fieldToValidate.isObjectsArray) {
        const fieldValidationsArr = this.validateObjectsArray({
          key,
          credentials: credentials[key],
          fieldsToValidate: fieldToValidate.fieldsToValidate,
        });

        return { [key]: fieldValidationsArr };
        // validate object
      } else if (fieldToValidate.isObject) {
        // validate primitive
      } else if (fieldToValidate.isPrimitive) {
        const fieldValidationsArr = this.validatePrimitive({
          key,
          credentials,
          rules: fieldToValidate.rules,
        });

        return { [key]: fieldValidationsArr };
      } else return [];
    });

    // set all described fields validations in appropriate error object
    Object.values(allFieldsValidations).forEach((fieldValidation) => {
      const isValidFieldValidation = fieldValidation instanceof Object;

      if (!isValidFieldValidation) return;

      const fieldValidationKey = Object.keys(fieldValidation)[0];
      const fieldToValidate = this.getFieldToValidate(fieldValidationKey);

      if (fieldToValidate.isPrimitivesArray) {
        this.setPrimitivesArrayError({
          key: fieldValidationKey,
          validationsArray: fieldValidation[fieldValidationKey],
        });
      } else if (fieldToValidate.isObjectsArray) {
        this.setObjectArrayError({
          key: fieldValidationKey,
          validationsArray: fieldValidation[fieldValidationKey],
        });
      } else if (fieldToValidate.isObject) {
      } else if (fieldToValidate.isPrimitive) {
        this.setPrimitivesError({
          key: fieldValidationKey,
          validationsArray: fieldValidation[fieldValidationKey],
        });
      }
    });

    return this.error;
  }
}
