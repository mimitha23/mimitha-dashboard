import { nanoid } from "@reduxjs/toolkit";

const MAIN_NAVIGATION = {
  root: "/",
  home: "/home",
  moderate: "/moderate",
  login: "/auth/login",
};

const MODERATE_SIDEBAR = {
  createColorPage: {
    relativePath: "create-color",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-color`,
  },
  createProductTypePage: {
    relativePath: "create-product-type",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-product-type`,
  },
  createVariantPage: {
    relativePath: "create-variant",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-variant`,
  },
  registerProductPage: {
    relativePath: "register-product",
    absolutePath: `${MAIN_NAVIGATION.moderate}/register-product`,
  },
  registeredProductsPage: {
    relativePath: "registered-products",
    absolutePath: `${MAIN_NAVIGATION.moderate}/registered-products`,
  },
  developeProductPage: {
    relativePath: "develope-product",
    absolutePath: `${MAIN_NAVIGATION.moderate}/develope-product`,
  },
};

const MODERATE_SIDEBAR_NESTED = {
  developedProductsPage: {
    relativePath: ({ registeredProductId }) =>
      `${registeredProductId ? registeredProductId : ":registeredProductId"}`,
    absolutePath: ({ registeredProductId }) =>
      `${MODERATE_SIDEBAR.registeredProductsPage.absolutePath}/${
        registeredProductId ? registeredProductId : ":registeredProductId"
      }`,
  },
  developedProductPage: {
    relativePath: ({ developedProductId }) =>
      `developed-product/${
        developedProductId ? developedProductId : ":developedProductId"
      }`,
    absolutePath: ({ registeredProductId, developedProductId }) =>
      `${MODERATE_SIDEBAR.registeredProductsPage.absolutePath}/${
        registeredProductId ? registeredProductId : ":registeredProductId"
      }/developed-product/${
        developedProductId ? developedProductId : ":developedProductId"
      }`,
  },
  addDevelopedProductPage: {
    relativePath: `develope-product`,
    absolutePath: ({ registeredProductId }) =>
      `${MODERATE_SIDEBAR.registeredProductsPage.absolutePath}/${
        registeredProductId ? registeredProductId : ":registeredProductId"
      }/develope-product`,
  },
};

export const PATHS = {
  main_navigation: MAIN_NAVIGATION,
  moderate_sidebar: MODERATE_SIDEBAR,
  moderate_nested_routes: MODERATE_SIDEBAR_NESTED,
};

export const MAIN_NAV_ROUTES = [
  {
    _id: nanoid(),
    caption: "სახლი",
    path: PATHS.main_navigation.home,
  },
  {
    _id: nanoid(),
    caption: "მოდერაცია",
    path: PATHS.main_navigation.moderate,
  },
  {
    _id: nanoid(),
    caption: "ავტორიზაცია",
    path: PATHS.main_navigation.login,
  },
];

export const MODERATE_SIDEBAR_ROUTES = [
  {
    _id: nanoid(),
    caption: "შექმენი ფერი",
    path: PATHS.moderate_sidebar.createColorPage,
  },
  {
    _id: nanoid(),
    caption: "შექმენი ვარიანტი",
    path: PATHS.moderate_sidebar.createVariantPage,
  },
  {
    _id: nanoid(),
    caption: "შექმენი პროდუქტის ტიპი",
    path: PATHS.moderate_sidebar.createProductTypePage,
  },
  {
    _id: nanoid(),
    caption: "დაარეგისტრირე პროდუქტი",
    path: PATHS.moderate_sidebar.registerProductPage,
  },
  {
    _id: nanoid(),
    caption: "განავითარე პროდუქტი",
    path: PATHS.moderate_sidebar.registeredProductsPage,
  },
];
