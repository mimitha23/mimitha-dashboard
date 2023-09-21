/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import {
  useRegisterProductGetQuery,
  useRegisterProductDeleteQuery,
} from "hooks/api/moderate/registerProduct";
import { useRegisterProductUtils } from "hooks/utils/moderate/registerProduct";

import * as Styled from "./styles/RegisteredProducts.styled";
import { Filter, LoadingSpinner, DeletionPopup } from "components/layouts";
import RegisteredProductCard from "./components/RegisteredProducts/RegisteredProductCard";

export default function RegisteredProducts() {
  const { status, registeredProducts, getAllRegisteredProductsQuery } =
    useRegisterProductGetQuery();

  const { activeDeletion, setActiveDeletion, onRegisteredProductDeleteQuery } =
    useRegisterProductDeleteQuery();

  const { onStartEdit } = useRegisterProductUtils();

  useEffect(() => {
    getAllRegisteredProductsQuery();
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
            {registeredProducts.map((product) => (
              <RegisteredProductCard
                key={product._id}
                product={product}
                onEdit={() => onStartEdit(product)}
                onDelete={() => setActiveDeletion(product._id)}
              />
            ))}
          </div>
        </>
      )}

      {activeDeletion && (
        <DeletionPopup
          onClose={() => setActiveDeletion("")}
          onConfirm={onRegisteredProductDeleteQuery}
          targetName="პროდუქტი"
        />
      )}

      {status.loading && <LoadingSpinner />}
    </Styled.RegisteredProducts>
  );
}
