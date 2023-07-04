import Validators from "utils/validators/Validators";
import { availableValidationRules as Rules } from "utils/validators/Validators";

export default class RegisterProductValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "productTypes",
        isPrimitive: true,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "gender",
        isPrimitive: true,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "productStyles",
        isPrimitive: true,
        rules: [Rules.isEmptyArray],
      },
      {
        key: "seasons",
        isPrimitive: true,
        rules: [Rules.isEmptyArray],
      },
      {
        key: "texture",
        isObjectsArray: true,
        fieldsToValidate: [
          {
            field: "texture_ka",
            rules: [Rules.notIsEmpty, Rules.isGeorgianLetters],
          },
          {
            field: "texture_en",
            rules: [Rules.notIsEmpty, Rules.isLatinLetters],
          },
          {
            field: "percentage",
            rules: [Rules.notIsEmpty, Rules.hasWhiteSpaceInSequence],
          },
        ],
      },
      {
        key: "warnings",
        isObjectsArray: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
    ];

    this.error = {
      hasError: false,
      productTypes: { hasError: false, message: "" },
      gender: { hasError: false, message: "" },
      productStyles: { hasError: false, error: "" },
      seasons: { hasError: false, error: "" },
      texture: { hasError: false, error: "", itemErrors: [] },
      warnings: { hasError: false, error: "", itemErrors: [] },
    };
  }
}
