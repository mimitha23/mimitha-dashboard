import { takeLatest } from "redux-saga/effects";
import { createVariant } from "store/reducers/moderate/createVariantReducer";
import { handleCreateVariant } from "store/saga/handlers/moderate/createVariantHandlers";

export default function* createVariantSaga() {
  yield takeLatest(createVariant, handleCreateVariant);
}
