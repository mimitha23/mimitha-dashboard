import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PATHS } from "config/routes";
import { variantActions } from "store/reducers/moderate/variantReducer";

export default function useVariantUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit(variant) {
    dispatch(variantActions.setVariantDefaults(variant));
    navigate(PATHS.moderate_sidebar.createVariantPage.absolutePath);
  }

  return { onStartEdit };
}
