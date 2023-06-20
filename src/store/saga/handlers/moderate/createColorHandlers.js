import { call, put } from "redux-saga/effects";
import { errorController, pretendLoading } from "store/saga/handlers/helpers";

import {
  setSuccess,
  setError,
} from "store/reducers/moderate/createColorReducer";

export function* handleCreateColor({ payload }) {
  try {
    yield pretendLoading();
    yield put(setSuccess());
    alert(JSON.stringify(payload));
  } catch (error) {
    yield errorController({
      error,
      location: "handleCreateColor",
      errorSetter: setError,
    });
  }
}
