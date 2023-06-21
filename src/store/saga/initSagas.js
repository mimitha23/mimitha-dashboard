import * as sagas from "./sagas/index";

const initSagas = (sagaMiddleware) =>
  Object.values(sagas).forEach((saga) => sagaMiddleware.run(saga));

export default initSagas;
