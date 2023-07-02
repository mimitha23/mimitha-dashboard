import Validators from "utils/validators/Validators";
import { availableValidationRules as Rules } from "utils/validators/Validators";

export default class CreateVariantValidation extends Validators {
  constructor(isUpdating) {
    super();

    this.isUpdating = isUpdating;

    this.validationToExecute = [
      {
        key: "variantType",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "label_ka",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isGeorgianLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "label_en",
        isPrimitive: true,
        rules: [
          Rules.notIsEmpty,
          Rules.isLatinLetters,
          Rules.hasWhiteSpaceInSequence,
        ],
      },
      {
        key: "description",
        isPrimitive: true,
        rules: [Rules.notIsEmpty],
      },
    ];

    this.controlValidationRulesOnUpdate();

    this.error = {
      hasError: false,
      variantType: { hasError: false, message: "" },
      label_ka: { hasError: false, message: "" },
      label_en: { hasError: false, message: "" },
      description: { hasError: false, message: "" },
      icon: { hasError: false, message: "" },
      newIcon: { hasError: false, message: "" },
    };
  }

  controlValidationRulesOnUpdate() {
    if (this.isUpdating)
      this.validationToExecute = [
        ...this.validationToExecute,
        {
          key: "icon",
          isPrimitive: true,
          rules: [Rules.notIsEmpty],
        },
        // {
        //   key: "newIcon",
        //   isPrimitive: true,
        //   rules: [Rules.isFileObject],
        // },
      ];
    else
      this.validationToExecute = [
        ...this.validationToExecute,
        {
          key: "icon",
          isPrimitive: true,
          rules: [Rules.isFileObject],
        },
      ];
  }
}
