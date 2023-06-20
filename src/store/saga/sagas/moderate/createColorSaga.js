import { takeLatest } from "redux-saga/effects";
import { createColor } from "store/reducers/moderate/createColorReducer";
import { handleCreateColor } from "store/saga/handlers/moderate/createColorHandlers";

export default function* createColorSaga() {
  yield takeLatest(createColor, handleCreateColor);
}
