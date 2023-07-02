import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";
import { productTypeAPI } from "store/saga/api/moderate";

export function* createProductType({ payload }) {
  try {
    yield call(productTypeAPI.createProductTypeQuery, payload);
    yield put(productTypeActions.resetFormState());
    yield put(productTypeActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "createProductTypeHandler",
      errorSetter: productTypeActions.setError,
    });
  }
}

export function* getAllProductTypes() {
  try {
    const { data } = yield call(productTypeAPI.getAllProductTypeQuery);
    yield put(productTypeActions.setAllProductTypes(data));
    yield put(productTypeActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllProductTypesHandler",
      errorSetter: productTypeActions.setError,
    });
  }
}

export function* updateProductType({ payload }) {
  try {
    yield call(productTypeAPI.updateProductTypeQuery, payload);
    yield put(productTypeActions.resetFormState());
    yield put(productTypeActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateProductTypeHandler",
      errorSetter: productTypeActions.setError,
    });
  }
}

export function* deleteProductType({ payload }) {
  try {
    yield call(productTypeAPI.deleteProductTypeQuery, payload);
    yield put(productTypeActions.setDeletedProductType(payload._id));
    yield put(productTypeActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteProductTypeHandler",
      errorSetter: productTypeActions.setError,
    });
  }
}
