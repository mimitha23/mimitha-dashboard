import { takeLatest } from "redux-saga/effects";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { registerProductHandlers } from "store/saga/handlers/moderate";

export default function* createProductTypeSaga() {
  yield takeLatest(
    registerProductActions.getRegisterProductFormSuggestions,
    registerProductHandlers.getRegisterProductFormSuggestions
  );
  yield takeLatest(
    registerProductActions.registerProduct,
    registerProductHandlers.registerProduct
  );
  yield takeLatest(
    registerProductActions.updateRegisteredProduct,
    registerProductHandlers.updateRegisteredProduct
  );
  yield takeLatest(
    registerProductActions.deleteRegisteredProduct,
    registerProductHandlers.deleteRegisteredProduct
  );
  yield takeLatest(
    registerProductActions.getAllRegisteredProducts,
    registerProductHandlers.getAllRegisteredProducts
  );
}
