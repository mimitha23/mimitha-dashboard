import { takeLatest } from "redux-saga/effects";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";
import { productTypeHandlers } from "store/saga/handlers/moderate";

export default function* createProductTypeSaga() {
  yield takeLatest(
    productTypeActions.createProductType,
    productTypeHandlers.createProductType
  );
  yield takeLatest(
    productTypeActions.updateProductType,
    productTypeHandlers.updateProductType
  );
  yield takeLatest(
    productTypeActions.deleteProductType,
    productTypeHandlers.deleteProductType
  );
  yield takeLatest(
    productTypeActions.getAllProductTypes,
    productTypeHandlers.getAllProductTypes
  );
}
