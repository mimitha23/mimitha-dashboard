import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import filterReducer from "./filterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
});

export default rootReducer;
