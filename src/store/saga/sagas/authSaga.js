import { takeLatest } from "redux-saga/effects";
import { authActions } from "store/reducers/authReducer";
import { loginHandler } from "../handlers/authHandlers";

export default function* authSaga() {
  yield takeLatest(authActions.login, loginHandler);
}
