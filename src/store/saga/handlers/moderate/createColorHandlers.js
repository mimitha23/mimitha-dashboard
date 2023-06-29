import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createColorAPI } from "store/saga/api/moderate";
import { createColorActions } from "store/reducers/moderate/createColorReducer";

export function* createColor({ payload }) {
  try {
    yield call(createColorAPI.createColorQuery, payload);
    yield put(createColorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createColorHandler",
      errorSetter: createColorActions.setError,
    });
  }
}

export function* getAllColors() {
  try {
    yield call(createColorAPI.getAllColorQuery);
    yield put(createColorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllColorsHandler",
      errorSetter: createColorActions.setError,
    });
  }
}

export function* updateColor({ payload }) {
  try {
    yield call(createColorAPI.updateColorQuery, payload);
    yield put(createColorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateColorHandler",
      errorSetter: createColorActions.setError,
    });
  }
}

export function* deleteColor({ payload }) {
  try {
    yield call(createColorAPI.createColorQuery, payload);
    yield put(createColorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteColorHandler",
      errorSetter: createColorActions.setError,
    });
  }
}
