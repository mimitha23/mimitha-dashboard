import { takeLatest } from "redux-saga/effects";
import { variantActions } from "store/reducers/moderate/variantReducer";
import { variantHandlers } from "store/saga/handlers/moderate";

export default function* createVariantSaga() {
  yield takeLatest(variantActions.createVariant, variantHandlers.createVariant);
  yield takeLatest(variantActions.updateVariant, variantHandlers.updateVariant);
  yield takeLatest(variantActions.deleteVariant, variantHandlers.deleteVariant);
  yield takeLatest(
    variantActions.getAllVariants,
    variantHandlers.getAllVariants
  );
}
