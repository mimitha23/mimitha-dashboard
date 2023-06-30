import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { colorAPI } from "store/saga/api/moderate";
import { colorActions } from "store/reducers/moderate/colorReducer";

export function* createColor({ payload }) {
  try {
    yield call(colorAPI.createColorQuery, payload);
    yield put(colorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createColorHandler",
      errorSetter: colorActions.setError,
    });
  }
}

export function* getAllColors() {
  try {
    const { data } = yield call(colorAPI.getAllColorQuery);
    yield put(colorActions.setAllColors(data));
    yield put(colorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllColorsHandler",
      errorSetter: colorActions.setError,
    });
  }
}

export function* updateColor({ payload }) {
  try {
    yield call(colorAPI.updateColorQuery, payload);
    yield put(colorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateColorHandler",
      errorSetter: colorActions.setError,
    });
  }
}

export function* deleteColor({ payload }) {
  try {
    yield call(colorAPI.deleteColorQuery, payload);
    yield put(colorActions.setDeletedColor(payload._id));
    yield put(colorActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteColorHandler",
      errorSetter: colorActions.setError,
    });
  }
}
