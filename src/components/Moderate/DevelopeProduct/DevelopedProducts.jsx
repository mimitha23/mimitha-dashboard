/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import {
  useDevelopeProductGetQuery,
  useDevelopeProductDeleteQuery,
} from "hooks/api/moderate/developeProduct";
import { useDevelopeProductUtils } from "hooks/utils/moderate/developeProduct";

import * as Styled from "./styles/DevelopedProducts.styled";
import { LoadingSpinner, DeletionPopup } from "components/layouts";
import DevelopedProductsList from "./components/DevelopedProducts/DevelopedProductsList";
import DevelopedProductsHeader from "./components/DevelopedProducts/DevelopedProductsHeader";

export default function DevelopedProducts({ children }) {
  const {
    status,
    registeredProductId,
    developedProductId,
    getAllDevelopedProductsQuery,
  } = useDevelopeProductGetQuery();

  const { activeDeletion, setActiveDeletion, onDevelopedProductDeleteQuery } =
    useDevelopeProductDeleteQuery();

  const { onStartEdit } = useDevelopeProductUtils();

  useEffect(() => {
    getAllDevelopedProductsQuery();
  }, []);

  return (
    <Styled.DevelopedProducts>
      <DevelopedProductsHeader />

      {!status.loading && (
        <main className="developed-products__container">
          <DevelopedProductsList
            onDelete={(id) => setActiveDeletion(id)}
            onEdit={(productId) =>
              onStartEdit({
                registeredProductId,
                developedProductId: productId,
                resetActive: developedProductId ? true : false,
              })
            }
            status={status}
          />

          {developedProductId && (
            <aside className="developed-products__aside">{children}</aside>
          )}
        </main>
      )}

      {activeDeletion && (
        <DeletionPopup
          onClose={() => setActiveDeletion("")}
          onConfirm={() =>
            onDevelopedProductDeleteQuery({
              registeredProductId,
              developedProductId,
            })
          }
          targetName="პროდუქტი"
        />
      )}

      {status.loading && <LoadingSpinner />}
    </Styled.DevelopedProducts>
  );
}
