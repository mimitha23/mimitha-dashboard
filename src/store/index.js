import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";
import initSagas from "./saga/initSagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

initSagas(sagaMiddleware);

export default store;

export const persistor = persistStore(store);
