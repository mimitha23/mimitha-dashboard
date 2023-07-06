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
        key: "textures",
        isObjectsArray: true,
        fieldsToValidate: [
          {
            field: "textures",
            rules: [Rules.isEmptyObject],
          },
          {
            field: "percentage",
            rules: [Rules.notIsEmpty, Rules.isNumber],
          },
        ],
      },
      {
        key: "warnings",
        isObjectsArray: true,
        fieldsToValidate: [
          {
            field: "ka",
            rules: [
              Rules.notIsEmpty,
              Rules.isGeorgianLetters,
              Rules.hasWhiteSpaceInSequence,
            ],
          },
          {
            field: "en",
            rules: [
              Rules.notIsEmpty,
              Rules.isLatinLetters,
              Rules.hasWhiteSpaceInSequence,
            ],
          },
        ],
      },
    ];

    this.error = {
      hasError: false,
      productTypes: { hasError: false, message: "" },
      gender: { hasError: false, message: "" },
      productStyles: { hasError: false, error: "" },
      seasons: { hasError: false, error: "" },
      textures: { hasError: false, error: "", itemErrors: [] },
      warnings: { hasError: false, error: "", itemErrors: [] },
    };
  }
}
