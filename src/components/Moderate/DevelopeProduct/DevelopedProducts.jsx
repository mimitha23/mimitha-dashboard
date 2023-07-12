/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PATHS } from "config/routes";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import { selectDevelopeProductStatus } from "store/selectors/moderate/developeProductSelectors";

import { LoadingSpinner, DeletionPopup } from "components/layouts";
import DevelopedProductsHeader from "./components/DevelopedProducts/DevelopedProductsHeader";
import DevelopedProductsList from "./components/DevelopedProducts/DevelopedProductsList";
import * as Styled from "./styles/DevelopedProducts.styled";

export default function DevelopedProducts({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registeredProductId, developedProductId } = useParams();

  const status = useSelector(selectDevelopeProductStatus);

  const [productToDeleteId, setProductToDeleteId] = useState("");

  function onDelete() {
    dispatch(
      developeProductActions.deleteDevelopedProduct({
        registeredProductId,
        developedProductId: productToDeleteId,
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

    setProductToDeleteId("");
  }

  function onEdit(product) {
    dispatch(
      developeProductActions.getDevelopedProduct({
        registeredProductId,
        developedProductId: product._id,
        getDefaults: true,
      })
    );

    navigate(
      PATHS.moderate_nested_routes.addDevelopedProductPage.absolutePath({
        registeredProductId,
      })
    );

    developedProductId &&
      dispatch(developeProductActions.resetDevelopedProduct());
  }

  useEffect(() => {
    dispatch(
      developeProductActions.getAllDevelopedProducts({ registeredProductId })
    );
  }, []);

  return (
    <Styled.DevelopedProducts>
      <DevelopedProductsHeader />

      {!status.loading && (
        <main className="developed-products__container">
          <DevelopedProductsList
            onDelete={(id) => setProductToDeleteId(id)}
            onEdit={onEdit}
          />
          {developedProductId && (
            <aside className="developed-products__aside">{children}</aside>
          )}
        </main>
      )}

      {productToDeleteId && (
        <DeletionPopup
          onClose={() => setProductToDeleteId("")}
          onConfirm={() => onDelete()}
          targetName="პროდუქტი"
        />
      )}

      {status.loading && <LoadingSpinner />}
    </Styled.DevelopedProducts>
  );
}
