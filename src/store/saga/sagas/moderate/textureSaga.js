import { takeLatest } from "redux-saga/effects";
import { textureActions } from "store/reducers/moderate/textureReducer";
import { textureHandlers } from "store/saga/handlers/moderate";

export default function* createTextureSaga() {
  yield takeLatest(textureActions.createTexture, textureHandlers.createTexture);
  yield takeLatest(textureActions.updateTexture, textureHandlers.updateTexture);
  yield takeLatest(textureActions.deleteTexture, textureHandlers.deleteTexture);
  yield takeLatest(
    textureActions.getAllTextures,
    textureHandlers.getAllTexture
  );
}
