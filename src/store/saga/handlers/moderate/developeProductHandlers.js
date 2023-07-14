import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import { developeProductAPI } from "store/saga/api/moderate";

export function* attachDevelopedProduct({ payload }) {
  try {
    yield call(developeProductAPI.attachDevelopedProductQuery, payload);
    yield put(developeProductActions.resetFormState());
    yield put(developeProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "attachDevelopedProductHandler",
      errorSetter: developeProductActions.setError,
    });
  }
}

export function* getDevelopedProduct({ payload }) {
  try {
    const { data } = yield call(
      developeProductAPI.getDevelopedProductQuery,
      payload
    );

    payload.getDefaults
      ? yield put(developeProductActions.setDevelopedProductDefaults(data))
      : yield put(developeProductActions.setActiveDevelopedProduct(data));

    yield put(developeProductActions.setSingleProductSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getDevelopedProductHandler",
      errorSetter: developeProductActions.setSingleProductError,
    });
  }
}

export function* copyDevelopedProductConfig({ payload }) {
  try {
    const { data } = yield call(
      developeProductAPI.copyDevelopedProductConfigQuery,
      payload
    );
    yield put(developeProductActions.setCopyDevelopedProductConfig(data));
    yield put(developeProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "copyDevelopedProductConfigHandler",
      errorSetter: developeProductActions.setSingleProductError,
    });
  }
}

export function* updateDevelopedProduct({ payload }) {
  try {
    yield call(developeProductAPI.updateDevelopedProductQuery, payload);
    yield put(developeProductActions.resetFormState());
    yield put(developeProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateDevelopedProductHandler",
      errorSetter: developeProductActions.setError,
    });
  }
}

export function* deleteDevelopedProduct({ payload }) {
  try {
    yield call(developeProductAPI.deleteDevelopedProductQuery, payload);
    yield put(
      developeProductActions.setDeletedDevelopedProduct(
        payload.developedProductId
      )
    );
    yield put(developeProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteDevelopedProductHandler",
      errorSetter: developeProductActions.setError,
    });
  }
}

export function* getAllDevelopedProducts({ payload }) {
  try {
    const { data } = yield call(
      developeProductAPI.getAllDevelopedProductsQuery,
      payload
    );
    yield put(developeProductActions.setAllDevelopedProducts(data));
    yield put(developeProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllDevelopedProductsHandler",
      errorSetter: developeProductActions.setError,
    });
  }
}

export function* getDevelopeProductFormSugestions() {
  try {
    const { data } = yield call(
      developeProductAPI.getDevelopeProductFormSugestionsQuery
    );
    yield put(developeProductActions.setDevelopeProductFormSugestions(data));
    yield put(developeProductActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getDevelopeProductFormSugestionsHandler",
      errorSetter: developeProductActions.setError,
    });
  }
}
