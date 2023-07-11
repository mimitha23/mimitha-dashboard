/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectDevelopeProductStatus } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { LoadingSpinner } from "components/layouts";
import DevelopedProductsHeader from "./components/DevelopedProducts/DevelopedProductsHeader";
import DevelopedProductsList from "./components/DevelopedProducts/DevelopedProductsList";
import * as Styled from "./styles/DevelopedProducts.styled";

export default function DevelopedProducts({ children }) {
  const dispatch = useDispatch();

  const status = useSelector(selectDevelopeProductStatus);

  const { registeredProductId } = useParams();

  useEffect(() => {
    dispatch(
      developeProductActions.getAllDevelopedProducts({ registeredProductId })
    );
  }, []);

  return (
    <Styled.DevelopedProducts>
      <DevelopedProductsHeader />

      {!status.loading && (
        <div className="developed-products__container">
          <DevelopedProductsList />
          <aside className="developed-products__aside">{children}</aside>
        </div>
      )}

      {status.loading && <LoadingSpinner />}
    </Styled.DevelopedProducts>
  );
}
