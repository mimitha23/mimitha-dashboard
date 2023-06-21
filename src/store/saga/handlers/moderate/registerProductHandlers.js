import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { registerProductAPI } from "store/saga/api/moderate";

export function* registerProduct({ payload }) {
  try {
    yield pretendLoading();
    yield call(registerProductAPI.registerProductQuery);
    yield put(registerProductActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "registerProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}
