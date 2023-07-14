import { takeLatest } from "redux-saga/effects";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import { developeProductHandlers } from "store/saga/handlers/moderate";

export default function* createColorSaga() {
  yield takeLatest(
    developeProductActions.attachDevelopedProduct,
    developeProductHandlers.attachDevelopedProduct
  );
  yield takeLatest(
    developeProductActions.getDevelopedProduct,
    developeProductHandlers.getDevelopedProduct
  );
  yield takeLatest(
    developeProductActions.copyDevelopedProductConfig,
    developeProductHandlers.copyDevelopedProductConfig
  );
  yield takeLatest(
    developeProductActions.updateDevelopedProduct,
    developeProductHandlers.updateDevelopedProduct
  );
  yield takeLatest(
    developeProductActions.deleteDevelopedProduct,
    developeProductHandlers.deleteDevelopedProduct
  );
  yield takeLatest(
    developeProductActions.getAllDevelopedProducts,
    developeProductHandlers.getAllDevelopedProducts
  );
  yield takeLatest(
    developeProductActions.getDevelopeProductFormSugestions,
    developeProductHandlers.getDevelopeProductFormSugestions
  );
}
