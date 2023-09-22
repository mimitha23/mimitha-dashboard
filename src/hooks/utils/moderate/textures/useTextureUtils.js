import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PATHS } from "config/routes";
import { textureActions } from "store/reducers/moderate/textureReducer";

export default function useTextureUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit(texture) {
    dispatch(textureActions.setTextureDefaults(texture));
    navigate(PATHS.moderate_sidebar.createTexturePage.absolutePath);
  }

  return { onStartEdit };
}
