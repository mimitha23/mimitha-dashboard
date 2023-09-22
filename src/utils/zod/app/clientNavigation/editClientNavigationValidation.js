import z from "zod";

const categoryEnums = z.enum(["men", "women", "adult", "family"]);

const navigationBlockTitle = z.object({ ka: z.string(), en: z.string() });

const navigationRoute = z.object({
  _id: z.string(),
  ka: z.string(),
  en: z.string(),
  query: z.string(),
  caption: z.string(),
});

const navigationBlock = z.object({
  _id: z.string(),
  title: navigationBlockTitle,
  routes: z.array(navigationRoute),
});

export const clientNavigationValidation = z.object({
  men: z.object({
    _id: z.string(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
  women: z.object({
    _id: z.string(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
  adult: z.object({
    _id: z.string(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
  family: z.object({
    _id: z.string(),
    category: categoryEnums,
    blocks: z.array(navigationBlock),
  }),
});
