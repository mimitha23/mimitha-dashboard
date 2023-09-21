/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  useProductTypeDeleteQuery,
  useProductTypesGetQuery,
} from "hooks/api/moderate/productTypes";
import { useDebounceOnSearch } from "hooks/utils";

import TypesList from "./components/TypesList";
import * as Styled from "./styles/ProductTypes.styled";
import { DeletionPopup, LoadingSpinner, Search } from "components/layouts";

export default function ProductTypes() {
  const [search, setSearch] = useState("");

  const { activeDeletion, setActiveDeletion, onProductTypeDeleteQuery } =
    useProductTypeDeleteQuery();

  const {
    status,
    productTypes,
    getAllProductTypesQuery,
    resetAllProductTypes,
  } = useProductTypesGetQuery();

  const { filteredArray: filteredProductTypes, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: productTypes,
      filterHandler: (type) =>
        type.ka.includes(search) || type.en.includes(search),
    });

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, productTypes]);

  useEffect(() => {
    getAllProductTypesQuery();

    return () => {
      resetAllProductTypes();
    };
  }, []);

  return (
    <Styled.ProductTypes>
      <div>
        <Search
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
          placeholder="მოძებნე პროდუქტის ტიპი..."
        />
      </div>

      {!status.loading && (
        <TypesList
          filteredProductTypes={filteredProductTypes}
          setActiveDeletion={setActiveDeletion}
        />
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="პროდუქტის ტიპი"
          onClose={() => setActiveDeletion("")}
          onConfirm={onProductTypeDeleteQuery}
        />
      )}
    </Styled.ProductTypes>
  );
}
