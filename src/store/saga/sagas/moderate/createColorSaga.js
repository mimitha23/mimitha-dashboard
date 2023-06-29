import { takeLatest } from "redux-saga/effects";
import { createColorActions } from "store/reducers/moderate/createColorReducer";
import { createColorHandlers } from "store/saga/handlers/moderate";

export default function* createColorSaga() {
  yield takeLatest(
    createColorActions.createColor,
    createColorHandlers.createColor
  );
  yield takeLatest(
    createColorActions.updateColor,
    createColorHandlers.updateColor
  );
  yield takeLatest(
    createColorActions.deleteColor,
    createColorHandlers.deleteColor
  );
  yield takeLatest(
    createColorActions.getAllColors,
    createColorHandlers.getAllColors
  );
}
