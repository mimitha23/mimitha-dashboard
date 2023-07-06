import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { textureAPI } from "store/saga/api/moderate";
import { textureActions } from "store/reducers/moderate/textureReducer";

export function* createTexture({ payload }) {
  try {
    yield call(textureAPI.createTextureQuery, payload);
    yield put(textureActions.resetFormState());
    yield put(textureActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createTextureHandler",
      errorSetter: textureActions.setError,
    });
  }
}

export function* getAllTexture() {
  try {
    const { data } = yield call(textureAPI.getAllTextureQuery);
    yield put(textureActions.setAllTextures(data));
    yield put(textureActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllTextureHandler",
      errorSetter: textureActions.setError,
    });
  }
}

export function* updateTexture({ payload }) {
  try {
    yield call(textureAPI.updateTextureQuery, payload);
    yield put(textureActions.resetFormState());
    yield put(textureActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateTextureHandler",
      errorSetter: textureActions.setError,
    });
  }
}

export function* deleteTexture({ payload }) {
  try {
    yield call(textureAPI.deleteTextureQuery, payload);
    yield put(textureActions.setDeletedTexture(payload._id));
    yield put(textureActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteTextureHandler",
      errorSetter: textureActions.setError,
    });
  }
}
