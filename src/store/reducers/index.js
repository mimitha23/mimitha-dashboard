import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import {
  createColorReducer,
  createVariantReducer,
  createProductTypeReducer,
  createProductStyleReducer,
  registerProductReducer,
} from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  // moderate
  createColor: createColorReducer,
  createVariant: createVariantReducer,
  createProductType: createProductTypeReducer,
  createProductStyle: createProductStyleReducer,
  registerProduct: registerProductReducer,
});

export default rootReducer;
