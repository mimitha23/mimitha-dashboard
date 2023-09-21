import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";

import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

export default function useRegisterProductUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit(product) {
    dispatch(registerProductActions.setRegisteredProductDefaults(product));
    navigate(PATHS.moderate_sidebar.registerProductPage.absolutePath);
  }

  return { onStartEdit };
}
