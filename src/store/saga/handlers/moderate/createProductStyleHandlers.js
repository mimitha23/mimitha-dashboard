import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createProductStyleActions } from "store/reducers/moderate/createProductStyleReducer";
import { createProductStyleAPI } from "store/saga/api/moderate";

export function* createProductStyle({ payload }) {
  try {
    yield call(createProductStyleAPI.createProductStyleQuery, payload);
    yield put(createProductStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createProductStyleHandler",
      errorSetter: createProductStyleActions.setError,
    });
  }
}

export function* getAllProductStyles() {
  try {
    yield call(createProductStyleAPI.getAllProductStyleQuery);
    yield put(createProductStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllProductStylesHandler",
      errorSetter: createProductStyleActions.setError,
    });
  }
}

export function* updateProductStyle({ payload }) {
  try {
    yield call(createProductStyleAPI.updateProductStyleQuery, payload);
    yield put(createProductStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateProductStyleHandler",
      errorSetter: createProductStyleActions.setError,
    });
  }
}

export function* deleteProductStyle({ payload }) {
  try {
    yield call(createProductStyleAPI.deleteProductStyleQuery, payload);
    yield put(createProductStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteProductStyleHandler",
      errorSetter: createProductStyleActions.setError,
    });
  }
}
