import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { variantAPI } from "store/saga/api/moderate";
import { variantActions } from "store/reducers/moderate/variantReducer";

export function* getExistingVariantTypes() {
  try {
    const { data } = yield call(variantAPI.getExistingVariantTypesQuery);
    yield put(variantActions.setExistingVariantTypes(data));
    yield put(variantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getExistingVariantTypesHandler",
      errorSetter: variantActions.setError,
    });
  }
}

export function* createVariant({ payload }) {
  try {
    yield call(variantAPI.createVariantQuery, payload);
    yield put(variantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createVariantHandler",
      errorSetter: variantActions.setError,
    });
  }
}

export function* getAllVariants() {
  try {
    const { data } = yield call(variantAPI.getAllVariantQuery);
    yield put(variantActions.setAllVariants(data));
    yield put(variantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllVariantsHandler",
      errorSetter: variantActions.setError,
    });
  }
}

export function* updateVariant({ payload }) {
  try {
    yield call(variantAPI.updateVariantQuery, payload);
    yield put(variantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateVariantHandler",
      errorSetter: variantActions.setError,
    });
  }
}

export function* deleteVariant({ payload }) {
  try {
    yield call(variantAPI.deleteVariantQuery, payload);
    yield put(variantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteVariantHandler",
      errorSetter: variantActions.setError,
    });
  }
}
