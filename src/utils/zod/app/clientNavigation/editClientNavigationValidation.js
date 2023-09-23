import z from "zod";
import * as validations from "utils/zod/helpers/validations";

const categoryEnums = z.enum(["men", "women", "adult", "family"]);

const navigationBlockTitle = z.object({
  ka: validations.isGeorgianLetters("ნავიგაციის კატეგორია (ka)"),
  en: validations.isLatinLetters("ნავიგაციის კატეგორია (en)"),
});

const navigationRoute = z.object({
  _id: z.string().trim().nonempty(),
  ka: validations.isGeorgianLetters("ნავიგაციის კურსი (ka)"),
  en: validations.isLatinLetters("ნავიგაციის კურსი (en)"),
  query: validations.isValidQueryStr("ნავიგაციის კურსის query"),
  caption: validations.isGeorgianLetters("ნავიგაციის query"),
});

const navigationBlock = z.object({
  _id: z.string().trim().nonempty(),
  title: navigationBlockTitle,
  routes: z.array(navigationRoute),
});

export const clientNavigationValidation = z.object({
  men: z.object({
    _id: z.string().trim().nonempty(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
  women: z.object({
    _id: z.string().trim().nonempty(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
  adult: z.object({
    _id: z.string().trim().nonempty(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
  family: z.object({
    _id: z.string().trim().nonempty(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
});
