import { call, put } from "redux-saga/effects";
import { registerProductAPI } from "store/saga/api/moderate";
import { errorController } from "store/saga/handlers/helpers";
import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

export function* getRegisterProductFormSuggestions() {
  try {
    const { data } = yield call(
      registerProductAPI.getRegisterProductFormSuggestionsQuery
    );
    yield put(registerProductActions.setRegisterProductFormSuggestions(data));
    yield put(registerProductActions.setStatusSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getRegisterProductFormSuggestionsHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}

export function* registerProduct({ payload }) {
  try {
    yield call(registerProductAPI.registerProductQuery, payload.data);
    yield put(
      registerProductActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS)
    );
  } catch (error) {
    yield errorController({
      error,
      location: "registerProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}

export function* updateRegisteredProduct({ payload }) {
  try {
    yield call(registerProductAPI.updateRegisteredProductQuery, payload);
    yield put(registerProductActions.resetFormState());
    yield put(
      registerProductActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS)
    );
  } catch (error) {
    yield errorController({
      error,
      location: "updateRegisteredProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}

export function* deleteRegisteredProduct({ payload }) {
  try {
    yield call(registerProductAPI.deleteRegisteredProductQuery, payload);
    yield put(registerProductActions.setDeletedRegisteredProduct(payload._id));
    yield put(registerProductActions.setStatusSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteRegisteredProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}

export function* getAllRegisteredProducts() {
  try {
    const { data } = yield call(
      registerProductAPI.getAllRegisteredProductsQuery
    );
    yield put(registerProductActions.setAllRegisteredProducts(data));
    yield put(registerProductActions.setStatusSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllRegisteredProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}
