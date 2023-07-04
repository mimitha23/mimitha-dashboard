import { takeLatest } from "redux-saga/effects";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { registerProductHandlers } from "store/saga/handlers/moderate";

export default function* createProductTypeSaga() {
  yield takeLatest(
    registerProductActions.getRegisterProductFormSugestions,
    registerProductHandlers.getRegisterProductFormSugestions
  );
}
