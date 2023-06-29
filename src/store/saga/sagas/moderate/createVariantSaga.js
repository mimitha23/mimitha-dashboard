import { takeLatest } from "redux-saga/effects";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";
import { createVariantHandlers } from "store/saga/handlers/moderate";

export default function* createVariantSaga() {
  yield takeLatest(
    createVariantActions.createVariant,
    createVariantHandlers.createVariant
  );
  yield takeLatest(
    createVariantActions.updateVariant,
    createVariantHandlers.updateVariant
  );
  yield takeLatest(
    createVariantActions.deleteVariant,
    createVariantHandlers.deleteVariant
  );
  yield takeLatest(
    createVariantActions.getAllVariants,
    createVariantHandlers.getAllVariants
  );
}
