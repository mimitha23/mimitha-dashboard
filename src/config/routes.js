import { nanoid } from "@reduxjs/toolkit";

export const PATHS = {
  main_navigation: {
    root: "/",
    home: "/home",
    moderate: "/moderate",
    login: "/auth/login",
  },
  moderate_sidebar: {
    createColorPage: "create-color",
    createProductTypePage: "create-product-type",
    createVariantPage: "create-variant",
    registerProductPage: "register-product",
    registeredProductsListPage: "registered-products",
    developeProductPage: "develope-product",
  },
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
    path: PATHS.moderate_sidebar.registeredProductsListPage,
  },
];

export const MODERATE_HIDDEN_ROUTES = {
  developedProductsListPage: {
    path: ":productId",
    fullPath:
      PATHS.main_navigation.moderate +
      "/" +
      PATHS.moderate_sidebar.registeredProductsListPage +
      "/:productId",
    productParam: ":productId",
  },
};
