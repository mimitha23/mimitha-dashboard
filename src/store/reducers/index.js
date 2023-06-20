import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

import { createColorReducer } from "./moderate";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  createColor: createColorReducer,
});

export default rootReducer;
