import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import {
  colorReducer,
  variantReducer,
  productTypeReducer,
  createProductStyleReducer,
  registerProductReducer,
} from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  // moderate
  color: colorReducer,
  variant: variantReducer,
  productType: productTypeReducer,
  createProductStyle: createProductStyleReducer,
  registerProduct: registerProductReducer,
});

export default rootReducer;
