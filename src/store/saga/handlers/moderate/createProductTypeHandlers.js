import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createProductTypeActions } from "store/reducers/moderate/createProductTypeReducer";
import { createProductTypeAPI } from "store/saga/api/moderate";

export function* createProductType({ payload }) {
  try {
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

export function* getAllProductTypes() {
  try {
    yield call(createProductTypeAPI.getAllProductTypeQuery);
    yield put(createProductTypeActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllProductTypesHandler",
      errorSetter: createProductTypeActions.setError,
    });
  }
}

export function* updateProductType({ payload }) {
  try {
    yield call(createProductTypeAPI.updateProductTypeQuery, payload);
    yield put(createProductTypeActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateProductTypeHandler",
      errorSetter: createProductTypeActions.setError,
    });
  }
}

export function* deleteProductType({ payload }) {
  try {
    yield call(createProductTypeAPI.deleteProductTypeQuery, payload);
    yield put(createProductTypeActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteProductTypeHandler",
      errorSetter: createProductTypeActions.setError,
    });
  }
}
