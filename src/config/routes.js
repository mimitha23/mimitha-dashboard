import { nanoid } from "@reduxjs/toolkit";

export const PATHS = {
  main_navigation: {
    root: "/",
    home: "/home",
    moderate: "/moderate",
    login: "/auth/login",
  },
  moderate_sidebar: {
    moderateColorPage: "color",
    moderateProductTypePage: "product-type",
    moderateVariantPage: "variant",
    moderateProductPage: "moderate-product",
    moderateDevelopedProductPage: "develope-product",
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
    path: PATHS.moderate_sidebar.moderateColorPage,
  },
  {
    _id: nanoid(),
    caption: "შექმენი ვარიანტი",
    path: PATHS.moderate_sidebar.moderateVariantPage,
  },
  {
    _id: nanoid(),
    caption: "შექმენი პროდუქტის ტიპი",
    path: PATHS.moderate_sidebar.moderateProductTypePage,
  },
  {
    _id: nanoid(),
    caption: "დაარეგისტრირე პროდუქტი",
    path: PATHS.moderate_sidebar.moderateProductPage,
  },
  {
    _id: nanoid(),
    caption: "განავითარე პროდუქტი",
    path: PATHS.moderate_sidebar.moderateDevelopedProductPage,
  },
];
