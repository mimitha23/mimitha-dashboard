import { call, put } from "redux-saga/effects";
import { productStyleAPI } from "store/saga/api/moderate";
import { errorController } from "store/saga/handlers/helpers";
import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";

export function* createProductStyle({ payload }) {
  try {
    yield call(productStyleAPI.createProductStyleQuery, payload.data);
    yield put(
      productStyleActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS)
    );
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
    yield put(productStyleActions.setStatusSuccess());
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
    yield put(
      productStyleActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS)
    );
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
    yield put(productStyleActions.setStatusSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteProductStyleHandler",
      errorSetter: productStyleActions.setError,
    });
  }
}
