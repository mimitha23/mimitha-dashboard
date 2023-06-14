import { takeLatest } from "redux-saga/effects";
import { login } from "store/reducers/authReducer";
import { loginHandler } from "../handlers/authHandlers";

export default function* authSaga() {
  yield takeLatest(login, loginHandler);
}
