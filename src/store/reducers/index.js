import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import {
  createColorReducer,
  createVariantReducer,
  createProductTypeReducer,
} from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  // moderate
  createColor: createColorReducer,
  createVariant: createVariantReducer,
  createProductType: createProductTypeReducer,
});

export default rootReducer;
