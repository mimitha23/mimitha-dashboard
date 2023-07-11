/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllRegisteredProducts,
  selectRegisterProductStatus,
} from "store/selectors/moderate/registerProductSelectors";
import { PATHS } from "config/routes";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { Filter, LoadingSpinner, DeletionPopup } from "components/layouts";
import RegisteredProductCard from "./components/RegisteredProducts/RegisteredProductCard";
import * as Styled from "./styles/RegisteredProducts.styled";

export default function RegisteredProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allRegisteredProducts = useSelector(selectAllRegisteredProducts);
  const status = useSelector(selectRegisterProductStatus);

  function onEdit(product) {
    dispatch(registerProductActions.setRegisteredProductDefaults(product));
    navigate(PATHS.moderate_sidebar.registerProductPage.absolutePath);
  }

  const [productToDeleteId, setProductToDeleteId] = useState("");

  function onDelete() {
    dispatch(registerProductActions.deleteRegisteredProduct(productToDeleteId));
    setProductToDeleteId("");
  }

  useEffect(() => {
    dispatch(registerProductActions.getAllRegisteredProducts());
  }, []);

  return (
    <Styled.RegisteredProducts>
      <span className="registered-products--list__title">
        რეგისტრირებული პროდუქტები
      </span>

      {!status.loading && (
        <>
          <div className="registered-products__filter-box">
            <Filter />
          </div>

          <div className="registered-products__list">
            {allRegisteredProducts.map((product) => (
              <RegisteredProductCard
                key={product._id}
                product={product}
                onEdit={() => onEdit(product)}
                onDelete={() => setProductToDeleteId(product._id)}
              />
            ))}
          </div>
        </>
      )}

      {productToDeleteId && (
        <DeletionPopup
          onClose={() => setProductToDeleteId("")}
          onConfirm={() => onDelete()}
          targetName="პროდუქტი"
        />
      )}

      {status.loading && <LoadingSpinner />}
    </Styled.RegisteredProducts>
  );
}
