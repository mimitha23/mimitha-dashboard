import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createVariantAPI } from "store/saga/api/moderate";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";

export function* createVariant({ payload }) {
  try {
    yield pretendLoading();
    yield call(createVariantAPI.createVariantQuery);
    yield put(createVariantActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "createVariantHandler",
      errorSetter: createVariantActions.setError,
    });
  }
}
