import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createColorAPI } from "store/saga/api/moderate";
import { createColorActions } from "store/reducers/moderate/createColorReducer";

export function* createColor({ payload }) {
  try {
    yield pretendLoading();
    yield call(createColorAPI.createColorQuery);
    yield put(createColorActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "createColorHandler",
      errorSetter: createColorActions.setError,
    });
  }
}
