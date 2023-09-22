import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

export default function useDevelopeProductDeleteQuery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeDeletion, setActiveDeletion] = useState("");

  function onDevelopedProductDeleteQuery({
    registeredProductId,
    developedProductId,
  }) {
    dispatch(
      developeProductActions.deleteDevelopedProduct({
        registeredProductId,
        developedProductId: activeDeletion || developedProductId,
      })
    );

    if (developedProductId) {
      navigate(
        PATHS.moderate_nested_routes.developedProductsPage.absolutePath({
          registeredProductId,
        })
      );

      dispatch(developeProductActions.resetDevelopedProduct());
    }

    setActiveDeletion("");
  }

  return { activeDeletion, setActiveDeletion, onDevelopedProductDeleteQuery };
}
