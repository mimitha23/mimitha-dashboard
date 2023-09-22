import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

export default function useDevelopeProductUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onStartEdit({
    registeredProductId,
    developedProductId,
    resetActive,
  }) {
    dispatch(
      developeProductActions.getDevelopedProduct({
        registeredProductId,
        developedProductId: developedProductId,
        getDefaults: true,
      })
    );

    navigate(
      PATHS.moderate_nested_routes.addDevelopedProductPage.absolutePath({
        registeredProductId,
      })
    );

    resetActive && dispatch(developeProductActions.resetDevelopedProduct());
  }

  return { onStartEdit };
}
