import { takeLatest } from "redux-saga/effects";
import { navActions } from "store/reducers/app/navigation/navReducer";
import { navHandlers } from "store/saga/handlers/app/nav";

export default function* navSaga() {
  yield takeLatest(navActions.getNav, navHandlers.getNav);
}
