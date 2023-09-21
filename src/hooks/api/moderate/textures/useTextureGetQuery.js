import { useDispatch, useSelector } from "react-redux";

import * as textureSelectors from "store/selectors/moderate/textureSelectors";
import { textureActions } from "store/reducers/moderate/textureReducer";

export default function useTextureGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(textureSelectors.selectTextureStatus);

  const textures = useSelector(textureSelectors.selectAllTextures);

  const getAllTexturesQuery = () => dispatch(textureActions.getAllTextures());

  const resetAllTextures = () => dispatch(textureActions.resetAllTextures());

  return { getAllTexturesQuery, textures, status, resetAllTextures };
}
