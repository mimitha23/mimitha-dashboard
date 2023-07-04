import { takeLatest } from "redux-saga/effects";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";
import { productStyleHandlers } from "store/saga/handlers/moderate";

export default function* createProductStyleSaga() {
  yield takeLatest(
    productStyleActions.createProductStyle,
    productStyleHandlers.createProductStyle
  );
  yield takeLatest(
    productStyleActions.updateProductStyle,
    productStyleHandlers.updateProductStyle
  );
  yield takeLatest(
    productStyleActions.deleteProductStyle,
    productStyleHandlers.deleteProductStyle
  );
  yield takeLatest(
    productStyleActions.getAllProductStyles,
    productStyleHandlers.getAllProductStyles
  );
}
