import { takeLatest } from "redux-saga/effects";
import { createProductTypeActions } from "store/reducers/moderate/createProductTypeReducer";
import { createProductTypeHandlers } from "store/saga/handlers/moderate";

export default function* createProductTypeSaga() {
  yield takeLatest(
    createProductTypeActions.createProductType,
    createProductTypeHandlers.createProductType
  );
}
