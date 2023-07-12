import {
  validationType,
  availableValidationRules as Rules,
} from "utils/validators/helpers/Validate";
import Validators from "utils/validators/Validators";

export default class DevelopeProductValidation extends Validators {
  constructor() {
    super();

    this.validationToExecute = [
      {
        key: "isPublic",
        validationType: validationType.isPrimitive,
        rules: [Rules.isBoolean],
      },
      {
        key: "title_ka",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.hasWhiteSpaceInSequence,
          Rules.isGeorgianLetters,
        ],
      },
      {
        key: "title_en",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.hasWhiteSpaceInSequence,
          Rules.isLatinLetters,
        ],
      },
      {
        key: "price",
        validationType: validationType.isPrimitive,
        rules: [Rules.notIsEmpty, Rules.isNumber],
      },
      {
        key: "color",
        validationType: validationType.isPrimitive,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "description_ka",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.hasWhiteSpaceInSequence,
          Rules.isGeorgianLetters,
        ],
      },
      {
        key: "description_en",
        validationType: validationType.isPrimitive,
        rules: [
          Rules.notIsEmpty,
          Rules.hasWhiteSpaceInSequence,
          Rules.isLatinLetters,
        ],
      },
      {
        key: "variants",
        validationType: validationType.isPrimitivesArray,
        rules: [Rules.isEmptyObject],
      },
      {
        key: "sizes",
        validationType: validationType.isObjectsArray,
        fieldsToValidate: [
          {
            field: "size",
            rules: [Rules.isEmptyObject],
          },
          {
            field: "amount",
            rules: [Rules.notIsEmpty, Rules.isNumber],
          },
        ],
      },
    ];

    this.error = {
      hasError: false,
      isPublic: { hasError: false, message: "" },
      title_ka: { hasError: false, message: "" },
      title_en: { hasError: false, message: "" },
      price: { hasError: false, message: "" },
      color: { hasError: false, message: "" },
      description_ka: { hasError: false, message: "" },
      description_en: { hasError: false, message: "" },
      variants: { hasError: false, message: "", itemErrors: [] },
      sizes: { hasError: false, message: "", itemErrors: [] },
    };
  }

  prepare(credentials) {
    if (credentials.isUpdating) {
      if (
        Array.isArray(credentials.filesToUpload) &&
        credentials.filesToUpload[0]
      ) {
        this.error.filesToUpload = {
          hasError: false,
          message: "",
          itemErrors: [],
        };

        this.validationToExecute.push({
          key: "filesToUpload",
          validationType: validationType.isPrimitivesArray,
          rules: [Rules.isEmptyObject, Rules.isImageFile],
        });
      }

      if (
        Array.isArray(credentials.filesToDelete) &&
        credentials.filesToDelete[0]
      ) {
        this.error.filesToDelete = {
          hasError: false,
          message: "",
          itemErrors: [],
        };

        this.validationToExecute.push({
          key: "filesToDelete",
          validationType: validationType.isPrimitivesArray,
          rules: [Rules.notIsEmpty],
        });
      }
    } else {
      this.error.filesToUpload = {
        message: "",
        hasError: false,
        itemErrors: [],
      };

      this.validationToExecute.push({
        key: "filesToUpload",
        validationType: validationType.isPrimitivesArray,
        rules: [Rules.isEmptyObject, Rules.isImageFile],
      });
    }

    return this;
  }
}
