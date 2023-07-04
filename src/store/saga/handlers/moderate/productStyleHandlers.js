import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";
import { productStyleAPI } from "store/saga/api/moderate";

export function* createProductStyle({ payload }) {
  try {
    yield call(productStyleAPI.createProductStyleQuery, payload);
    yield put(productStyleActions.resetFormState());
    yield put(productStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createProductStyleHandler",
      errorSetter: productStyleActions.setError,
    });
  }
}

export function* getAllProductStyles() {
  try {
    const { data } = yield call(productStyleAPI.getAllProductStyleQuery);
    yield put(productStyleActions.setAllProductStyles(data));
    yield put(productStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllProductStylesHandler",
      errorSetter: productStyleActions.setError,
    });
  }
}

export function* updateProductStyle({ payload }) {
  try {
    yield call(productStyleAPI.updateProductStyleQuery, payload);
    yield put(productStyleActions.resetFormState());
    yield put(productStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateProductStyleHandler",
      errorSetter: productStyleActions.setError,
    });
  }
}

export function* deleteProductStyle({ payload }) {
  try {
    yield call(productStyleAPI.deleteProductStyleQuery, payload);
    yield put(productStyleActions.setDeletedProductStyle(payload._id));
    yield put(productStyleActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteProductStyleHandler",
      errorSetter: productStyleActions.setError,
    });
  }
}
