import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import {
  colorReducer,
  variantReducer,
  textureReducer,
  productTypeReducer,
  productStyleReducer,
  developeProductReducer,
  registerProductReducer,
} from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  // moderate
  color: colorReducer,
  variant: variantReducer,
  texture: textureReducer,
  productType: productTypeReducer,
  productStyle: productStyleReducer,
  registerProduct: registerProductReducer,
  developeProduct: developeProductReducer,
});

export default rootReducer;
