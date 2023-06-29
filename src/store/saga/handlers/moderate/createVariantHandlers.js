import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";
import { createVariantAPI } from "store/saga/api/moderate";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";

export function* createVariant({ payload }) {
  try {
    yield call(createVariantAPI.createVariantQuery, payload);
    yield put(createVariantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createVariantHandler",
      errorSetter: createVariantActions.setError,
    });
  }
}

export function* getAllVariants() {
  try {
    yield call(createVariantAPI.getAllVariantQuery);
    yield put(createVariantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllVariantsHandler",
      errorSetter: createVariantActions.setError,
    });
  }
}

export function* updateVariant({ payload }) {
  try {
    yield call(createVariantAPI.updateVariantQuery, payload);
    yield put(createVariantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateVariantHandler",
      errorSetter: createVariantActions.setError,
    });
  }
}

export function* deleteVariant({ payload }) {
  try {
    yield call(createVariantAPI.deleteVariantQuery, payload);
    yield put(createVariantActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteVariantHandler",
      errorSetter: createVariantActions.setError,
    });
  }
}
