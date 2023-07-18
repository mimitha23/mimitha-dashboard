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
        key: "isEditable",
        validationType: validationType.isPrimitive,
        rules: [Rules.isBoolean],
      },
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
        key: "category",
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
      isEditable: { hasError: false, message: "" },
      gender: { hasError: false, message: "" },
      category: { hasError: false, message: "" },
      productStyles: { hasError: false, message: "" },
      seasons: { hasError: false, message: "" },
      textures: { hasError: false, message: "", itemErrors: [] },
      warnings: { hasError: false, message: "", itemErrors: [] },
    };
  }

  prepare(credentials) {
    if (credentials.isUpdating) {
      this.error.thumbnail = { hasError: false, message: "" };
      this.validationToExecute.push({
        key: "thumbnail",
        validationType: validationType.isPrimitive,
        rules: [Rules.notIsEmpty],
      });

      if (credentials.newThumbnail) {
        this.error.newThumbnail = { hasError: false, message: "" };
        this.validationToExecute.push({
          key: "newThumbnail",
          validationType: validationType.isPrimitive,
          rules: [Rules.isImageFile],
        });
      }
    } else {
      this.error.newThumbnail = { hasError: false, message: "" };
      this.validationToExecute.push({
        key: "newThumbnail",
        validationType: validationType.isPrimitive,
        rules: [Rules.isImageFile],
      });
    }

    return this;
  }

  validateTexturesPercentageSum(textures) {
    if (!Array.isArray(textures) || (Array.isArray(textures) && !textures[0]))
      return this;

    const reducedPercentage = textures.reduce(
      (acc, texture) => acc + parseFloat(texture.percentage),
      0
    );

    if (reducedPercentage > 100 || reducedPercentage < 100) {
      this.error.textures = {
        ...this.error.textures,
        hasError: true,
        error: "შეყვანილი ტექსტურების პროცენტული ჯამი უნდა წარმოადგენდეს 100%",
      };

      this.error.hasError = true;
    }

    return this;
  }

  validateSameTextures(textures) {
    if (
      !textures ||
      !Array.isArray(textures) ||
      (Array.isArray(textures) && !textures[0])
    )
      return this;

    const enteredTextures = textures.map((txt) => txt.textures?.ka);

    const temp = [];
    let isDuplicated = false;

    enteredTextures.forEach((txt) => {
      if (temp.includes(txt)) isDuplicated = true;
      temp.push(txt);
    });

    if (isDuplicated) {
      this.error.textures = {
        ...this.error.textures,
        hasError: true,
        error: "textures შეიცავს დუბლირებულ ტექსტურას",
      };

      this.error.hasError = true;
    }

    return this;
  }
}
