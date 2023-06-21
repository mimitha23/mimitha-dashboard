import { takeLatest } from "redux-saga/effects";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";
import { createVariantHandlers } from "store/saga/handlers/moderate";

export default function* createVariantSaga() {
  yield takeLatest(
    createVariantActions.createVariant,
    createVariantHandlers.createVariant
  );
}
