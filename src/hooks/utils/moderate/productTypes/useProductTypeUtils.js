import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { PATHS } from "config/routes";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";

export default function useProductTypeUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit(productType) {
    dispatch(productTypeActions.setProductTypeDefaults(productType));
    navigate(PATHS.moderate_sidebar.createProductTypePage.absolutePath);
  }

  return { onStartEdit };
}
