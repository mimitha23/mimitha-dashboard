import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { navAPI } from "store/saga/api/app/nav";
import { navActions } from "store/reducers/app/navigation/navReducer";

export function* getNav() {
  try {
    const { data } = yield call(navAPI.getNav);
    yield put(navActions.setNav(data));
    yield put(navActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getNavHandler",
      errorSetter: navActions.setError,
    });
  }
}
