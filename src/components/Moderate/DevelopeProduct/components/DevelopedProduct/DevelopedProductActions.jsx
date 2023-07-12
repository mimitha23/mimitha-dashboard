import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { DeletionPopup } from "components/layouts";
import * as Styled from "./styles/DevelopedProductActions.styled";

export default function DevelopedProductActions({
  registeredProductId,
  developedProductId,
  product,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productToDeleteId, setProductToDeleteId] = useState("");

  function onDelete() {
    if (!registeredProductId || !developedProductId) return;

    dispatch(
      developeProductActions.deleteDevelopedProduct({
        registeredProductId,
        developedProductId,
      })
    );

    navigate(
      PATHS.moderate_nested_routes.developedProductsPage.absolutePath({
        registeredProductId,
      })
    );

    dispatch(developeProductActions.resetDevelopedProduct());
  }

  function onEdit() {
    dispatch(developeProductActions.setDevelopedProductDefaults(product));

    navigate(
      PATHS.moderate_nested_routes.addDevelopedProductPage.absolutePath({
        registeredProductId,
      })
    );

    dispatch(developeProductActions.resetDevelopedProduct());
  }

  return (
    <>
      <Styled.DevelopedProductActions>
        <button
          onClick={() => setProductToDeleteId(developedProductId)}
          className="developed-product--actions__btn delete"
        >
          წაშალე
        </button>
        <button
          onClick={onEdit}
          className="developed-product--actions__btn edit"
        >
          რედაქტირება
        </button>
      </Styled.DevelopedProductActions>

      {productToDeleteId && (
        <DeletionPopup
          targetName="პროდუქტი"
          onConfirm={onDelete}
          onClose={() => setProductToDeleteId("")}
        />
      )}
    </>
  );
}
