import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { authActions } from "store/reducers/authReducer";
import { authAPI } from "store/saga/api";

export function* loginHandler({ payload }) {
  try {
    const { data } = yield call(authAPI.loginQuery, payload);
    yield put(authActions.resetForm());
    yield put(authActions.setUser(data));
    yield put(authActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "loginHandler",
      errorSetter: authActions.setError,
    });
  }
}

export function* logoutHandler() {
  try {
    yield call(authAPI.logoutQuery);
    yield put(authActions.setLogedoutUser());
    yield put(authActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "logoutHandler",
      errorSetter: authActions.setError,
    });
  }
}
