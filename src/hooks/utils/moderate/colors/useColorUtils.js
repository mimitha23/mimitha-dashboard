import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PATHS } from "config/routes";
import { colorActions } from "store/reducers/moderate/colorReducer";

export default function useColorUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit(color) {
    dispatch(colorActions.setColorDefaults(color));
    navigate(PATHS.moderate_sidebar.createColorPage.absolutePath);
  }

  return { onStartEdit };
}
