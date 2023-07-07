import {
  validationType,
  availableValidationRules as Rules,
} from "utils/validators/helpers/Validate";
import Validators from "utils/validators/Validators";

export default class RegisterProductValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "productTypes",
        validationType: validationType.isPrimitive,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "gender",
        validationType: validationType.isPrimitive,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "productStyles",
        validationType: validationType.isPrimitive,
        rules: [Rules.isEmptyArray],
      },
      {
        key: "seasons",
        validationType: validationType.isPrimitive,
        rules: [Rules.isEmptyArray],
      },
      {
        key: "textures",
        validationType: validationType.isObjectsArray,
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
        validationType: validationType.isObjectsArray,
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
