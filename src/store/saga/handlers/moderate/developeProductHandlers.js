import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import { developeProductAPI } from "store/saga/api/moderate";

export function* addDevelopedProduct({ payload }) {
  try {
    yield pretendLoading();
    yield call(developeProductAPI.addDevelopedProductQuery);
    yield put(developeProductActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "developeProductHandler",
      errorSetter: developeProductActions.setError,
    });
  }
}
