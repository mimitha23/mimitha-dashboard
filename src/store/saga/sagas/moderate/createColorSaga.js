import { takeLatest } from "redux-saga/effects";
import { createColorActions } from "store/reducers/moderate/createColorReducer";
import { createColorHandlers } from "store/saga/handlers/moderate";

export default function* createColorSaga() {
  yield takeLatest(
    createColorActions.createColor,
    createColorHandlers.createColor
  );
}
