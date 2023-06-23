import Validators from "utils/validators/Validators";
import { availableValidationRules as Rules } from "utils/validators/Validators";

export default class RegisterProductValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "productType",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "gender",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "styles",
        isPrimitivesArray: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "season",
        isPrimitivesArray: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "texture",
        isObjectsArray: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "warning",
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
      productType: { hasError: false, message: "" },
      gender: { hasError: false, message: "" },
      styles: { hasError: false, error: "", itemErrors: [] },
      season: { hasError: false, error: "", itemErrors: [] },
      texture: { hasError: false, error: "", itemErrors: [] },
      warning: { hasError: false, error: "", itemErrors: [] },
    };
  }
}
