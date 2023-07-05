import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import {
  colorReducer,
  variantReducer,
  productTypeReducer,
  productStyleReducer,
  textureReducer,
  registerProductReducer,
} from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  // moderate
  color: colorReducer,
  variant: variantReducer,
  productType: productTypeReducer,
  productStyle: productStyleReducer,
  texture: textureReducer,
  registerProduct: registerProductReducer,
});

export default rootReducer;
