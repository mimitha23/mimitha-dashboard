import { takeLatest } from "redux-saga/effects";
import { createProductStyleActions } from "store/reducers/moderate/createProductStyleReducer";
import { createProductStyleHandlers } from "store/saga/handlers/moderate";

export default function* createProductStyleSaga() {
  yield takeLatest(
    createProductStyleActions.createProductStyle,
    createProductStyleHandlers.createProductStyle
  );
  yield takeLatest(
    createProductStyleActions.updateProductStyle,
    createProductStyleHandlers.updateProductStyle
  );
  yield takeLatest(
    createProductStyleActions.deleteProductStyle,
    createProductStyleHandlers.deleteProductStyle
  );
  yield takeLatest(
    createProductStyleActions.getAllProductStyles,
    createProductStyleHandlers.getAllProductStyles
  );
}
