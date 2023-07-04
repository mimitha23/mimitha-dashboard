import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { registerProductAPI } from "store/saga/api/moderate";

export function* getRegisterProductFormSugestions() {
  try {
    const { data } = yield call(
      registerProductAPI.getRegisterProductFormSugestionsQuery
    );
    yield put(registerProductActions.setRegisterProductFormSugestions(data));
    yield put(registerProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getRegisterProductFormSugestions",
      errorSetter: registerProductActions.setError,
    });
  }
}

export function* registerProduct({ payload }) {
  try {
    yield call(registerProductAPI.registerProductQuery);
    yield put(registerProductActions.setSuccess(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "registerProductHandler",
      errorSetter: registerProductActions.setError,
    });
  }
}
