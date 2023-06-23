export default class Validate {
  validate(credentials) {
    const validateableKeys = this.getValidateableKeys(credentials);

    const allFieldsValidations = validateableKeys.map((key) => {
      const fieldToValidate = this.getFieldToValidate(key);

      if (fieldToValidate.isPrimitivesArray) {
        const fieldValidationsArr = this.validatePrimitivesArray({
          key,
          credentials,
          rules: fieldToValidate.rules,
        });

        return { [key]: fieldValidationsArr };
      } else if (fieldToValidate.isObjectsArray) {
      } else if (fieldToValidate.isObject) {
      } else if (fieldToValidate.isPrimitive) {
        const fieldValidationsArr = this.validatePrimitive({
          key,
          credentials,
          rules: fieldToValidate.rules,
        });

        return { [key]: fieldValidationsArr };
      } else return [];
    });

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
