import { call, put } from "redux-saga/effects";
import { colorAPI } from "store/saga/api/moderate";
import { errorController } from "store/saga/handlers/helpers";
import { colorActions } from "store/reducers/moderate/colorReducer";
import { REQUEST_STATUS_STAGE } from "store/reducers/helpers/controlStatus";

export function* createColor({ payload }) {
  try {
    yield call(colorAPI.createColorQuery, payload.data);
    yield put(colorActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS));
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
    yield put(colorActions.setStatusSuccess());
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
    yield put(colorActions.resetFormState());
    yield put(colorActions.setStatusSuccess(REQUEST_STATUS_STAGE.SUCCESS));
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
    yield put(colorActions.setStatusSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteColorHandler",
      errorSetter: colorActions.setError,
    });
  }
}
