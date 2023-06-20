import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import { createColorReducer, createVariantReducer } from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  createColor: createColorReducer,
  createVariant: createVariantReducer,
});

export default rootReducer;
