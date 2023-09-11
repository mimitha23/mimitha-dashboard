import { call, put } from "redux-saga/effects";
import { productTypeAPI } from "store/saga/api/moderate";
import { errorController } from "store/saga/handlers/helpers";
import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";

export function* createProductType({ payload }) {
  try {
    yield call(productTypeAPI.createProductTypeQuery, payload.data);
    yield put(
      productTypeActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS)
    );
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
    yield put(productTypeActions.setStatusSuccess());
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
    yield put(
      productTypeActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS)
    );
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
    yield put(productTypeActions.setStatusSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteProductTypeHandler",
      errorSetter: productTypeActions.setError,
    });
  }
}
