import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

import { navReducer } from "./app/navigation";

const persistedAuthReducer = generatePersistedReducer({
  key: "mimitha_dashboard_user",
  reducer: authReducer,
  whitelist: ["user"],
});

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  filter: filterReducer,
  // moderate
  color: colorReducer,
  variant: variantReducer,
  texture: textureReducer,
  productType: productTypeReducer,
  productStyle: productStyleReducer,
  registerProduct: registerProductReducer,
  developeProduct: developeProductReducer,
  // app
  nav: navReducer,
});

export default rootReducer;

function generatePersistedReducer({ key, whitelist = [], reducer }) {
  return persistReducer(
    {
      key,
      storage,
      whitelist,
      version: 1,
    },
    reducer
  );
}
