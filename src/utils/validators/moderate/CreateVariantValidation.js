import {
  validationType,
  availableValidationRules as Rules,
} from "utils/validators/helpers/Validate";
import Validators from "utils/validators/Validators";

export default class CreateVariantValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "variantType",
        validationType: validationType.isObject,
        fieldsToValidate: [
          {
            field: "caption",
            rules: [
              Rules.notIsEmpty,
              Rules.isLatinLetters,
              Rules.hasWhiteSpaceInSequence,
            ],
          },
        ],
      },
      {
        key: "label_ka",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "label_en",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "description",
        validationType: validationType.isPrimitive,
        rules: [Rules.notIsEmpty],
      },
    ];

    this.error = {
      hasError: false,
      variantType: { hasError: false, message: "", itemErrors: [] },
      label_ka: { hasError: false, message: "" },
      label_en: { hasError: false, message: "" },
      description: { hasError: false, message: "" },
      icon: { hasError: false, message: "" },
      newIcon: { hasError: false, message: "" },
    };
  }

  prepare(credentials) {
    if (credentials.isUpdating) {
      this.error.icon = { hasError: false, message: "" };
      this.validationToExecute.push({
        key: "icon",
        validationType: validationType.isPrimitive,
        rules: [Rules.notIsEmpty],
      });

      if (credentials.newIcon) {
        this.error.newIcon = { hasError: false, message: "" };
        this.validationToExecute.push({
          key: "newIcon",
          validationType: validationType.isPrimitive,
          rules: [Rules.isImageFile],
        });
      }
    } else {
      this.error.newIcon = { hasError: false, message: "" };
      this.validationToExecute.push({
        key: "newIcon",
        validationType: validationType.isPrimitive,
        rules: [Rules.isImageFile],
      });
    }

    return this;
  }
}
