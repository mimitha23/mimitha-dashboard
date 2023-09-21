/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  useProductStyleDeleteQuery,
  useProductStylesGetQuery,
} from "hooks/api/moderate/productStyles";
import { useDebounceOnSearch } from "hooks/utils";

import StylesList from "./components/StylesList";
import * as Styled from "./styles/ProductStyles.styled";
import { LoadingSpinner, DeletionPopup, Search } from "components/layouts";

export default function ProductStyles() {
  const { activeDeletion, setActiveDeletion, onProductStyleDeleteQuery } =
    useProductStyleDeleteQuery();

  const {
    status,
    productStyles,
    getAllProductStylesQuery,
    resetAllProductStyles,
  } = useProductStylesGetQuery();

  const [search, setSearch] = useState("");

  const { filteredArray: filteredProductStyles, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: productStyles,
      filterHandler: (style) =>
        style.ka.includes(search) || style.en.includes(search),
    });

  useEffect(() => {
    getAllProductStylesQuery();

    return () => {
      resetAllProductStyles();
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, productStyles]);

  return (
    <Styled.ProductStyles>
      <div>
        <Search
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
          placeholder="მოძებნე პროდუქტის სტილი..."
        />
      </div>

      {!status.loading && (
        <StylesList
          filteredProductStyles={filteredProductStyles}
          setActiveDeletion={setActiveDeletion}
        />
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="პროდუქტის ტიპი"
          onClose={() => setActiveDeletion("")}
          onConfirm={onProductStyleDeleteQuery}
        />
      )}
    </Styled.ProductStyles>
  );
}
