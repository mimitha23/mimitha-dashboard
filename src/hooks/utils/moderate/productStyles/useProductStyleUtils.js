import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PATHS } from "config/routes";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";

export default function useProductStyleUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit(style) {
    dispatch(productStyleActions.setProductStyleDefaults(style));
    navigate(PATHS.moderate_sidebar.createProductStylePage.absolutePath);
  }

  return { onStartEdit };
}
