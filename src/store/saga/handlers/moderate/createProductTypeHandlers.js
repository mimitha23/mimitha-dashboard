import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createProductTypeActions } from "store/reducers/moderate/createProductTypeReducer";
import { createProductTypeAPI } from "store/saga/api/moderate";

export function* createProductType({ payload }) {
  try {
    yield pretendLoading();
    yield call(createProductTypeAPI.createProductTypeQuery, payload);
    yield put(createProductTypeActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "createProductTypeHandler",
      errorSetter: createProductTypeActions.setError,
    });
  }
}
