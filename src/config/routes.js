import { nanoid } from "@reduxjs/toolkit";

const MAIN_NAVIGATION = {
  root: "/",
  home: "/home",
  moderate: "/moderate",
  app: "/app",
};

///////////////
// MODERATE //
/////////////

const MODERATE_SIDEBAR = {
  createColorPage: {
    relativePath: "create-color",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-color`,
  },
  createVariantPage: {
    relativePath: "create-variant",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-variant`,
  },
  createProductTypePage: {
    relativePath: "create-product-type",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-product-type`,
  },
  createProductStylePage: {
    relativePath: "create-product-style",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-product-style`,
  },
  createTexturePage: {
    relativePath: "create-texture",
    absolutePath: `${MAIN_NAVIGATION.moderate}/create-texture`,
  },
  registerProductPage: {
    relativePath: "register-product",
    absolutePath: `${MAIN_NAVIGATION.moderate}/register-product`,
  },
  registeredProductsPage: {
    relativePath: "registered-products",
    absolutePath: `${MAIN_NAVIGATION.moderate}/registered-products`,
  },
};

const MODERATE_SIDEBAR_NESTED = {
  colorsPage: {
    relativePath: () => `all-colors`,
    absolutePath: () =>
      `${MODERATE_SIDEBAR.createColorPage.absolutePath}/all-colors`,
  },
  variantsPage: {
    relativePath: () => `all-variants`,
    absolutePath: () =>
      `${MODERATE_SIDEBAR.createVariantPage.absolutePath}/all-variants`,
  },
  productTypesPage: {
    relativePath: () => `all-types`,
    absolutePath: () =>
      `${MODERATE_SIDEBAR.createProductTypePage.absolutePath}/all-types`,
  },
  productStylesPage: {
    relativePath: () => `all-styles`,
    absolutePath: () =>
      `${MODERATE_SIDEBAR.createProductStylePage.absolutePath}/all-styles`,
  },
  texturesPage: {
    relativePath: () => `all-texture`,
    absolutePath: () =>
      `${MODERATE_SIDEBAR.createTexturePage.absolutePath}/all-texture`,
  },
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

//////////
// APP //
////////

const APP_SIDEBAR = {
  createNavRoutePage: {
    relativePath: "create-nav-route",
    absolutePath: `${MAIN_NAVIGATION.app}/create-nav-route`,
  },
  editNavPage: {
    relativePath: "edit-nav",
    absolutePath: `${MAIN_NAVIGATION.app}/edit-nav`,
  },
};

// EXPORTS

export const PATHS = {
  main_navigation: MAIN_NAVIGATION,
  moderate_sidebar: MODERATE_SIDEBAR,
  moderate_nested_routes: MODERATE_SIDEBAR_NESTED,
  app_sidebar: APP_SIDEBAR,
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
    caption: "აპლიკაცია",
    path: PATHS.main_navigation.app,
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
    caption: "შექმენი პროდუქტის სტილი",
    path: PATHS.moderate_sidebar.createProductStylePage,
  },
  {
    _id: nanoid(),
    caption: "შექმენი ტექსტურა",
    path: PATHS.moderate_sidebar.createTexturePage,
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

export const PUBLIC_ROUTES = [];
