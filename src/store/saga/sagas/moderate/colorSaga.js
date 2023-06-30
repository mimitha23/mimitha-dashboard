import { takeLatest } from "redux-saga/effects";
import { colorActions } from "store/reducers/moderate/colorReducer";
import { colorHandlers } from "store/saga/handlers/moderate";

export default function* createColorSaga() {
  yield takeLatest(colorActions.createColor, colorHandlers.createColor);
  yield takeLatest(colorActions.updateColor, colorHandlers.updateColor);
  yield takeLatest(colorActions.deleteColor, colorHandlers.deleteColor);
  yield takeLatest(colorActions.getAllColors, colorHandlers.getAllColors);
}
