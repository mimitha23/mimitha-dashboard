import { takeLatest } from "redux-saga/effects";
import { authActions } from "store/reducers/authReducer";
import { authHandlers } from "../handlers";

export default function* authSaga() {
  yield takeLatest(authActions.login, authHandlers.loginHandler);
  yield takeLatest(authActions.logout, authHandlers.logoutHandler);
}
