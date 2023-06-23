import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createProductStyleActions } from "store/reducers/moderate/createProductStyleReducer";
import { createProductStyleAPI } from "store/saga/api/moderate";

export function* createProductStyle({ payload }) {
  try {
    yield pretendLoading();
    yield call(createProductStyleAPI.createProductStyleQuery, payload);
    yield put(createProductStyleActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "createProductTypeHandler",
      errorSetter: createProductStyleActions.setError,
    });
  }
}
