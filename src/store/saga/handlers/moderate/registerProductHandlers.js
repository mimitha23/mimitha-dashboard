import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { registerProductAPI } from "store/saga/api/moderate";

export function* getRegisterProductFormSuggestions() {
  try {
    const { data } = yield call(
      registerProductAPI.getRegisterProductFormSuggestionsQuery
    );
    yield put(registerProductActions.setRegisterProductFormSuggestions(data));
    yield put(registerProductActions.setSuccess());
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
    yield call(registerProductAPI.registerProductQuery, payload);
    yield put(registerProductActions.resetFormState());
    yield put(registerProductActions.setSuccess());
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
    yield put(registerProductActions.setSuccess());
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
    yield put(registerProductActions.setSuccess());
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
    yield put(registerProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllRegisteredProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}
