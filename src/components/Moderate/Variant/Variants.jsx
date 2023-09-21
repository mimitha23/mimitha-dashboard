/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  useVariantDeleteQuery,
  useVariantsGetQuery,
} from "hooks/api/moderate/variants";
import { useDebounceOnSearch } from "hooks/utils";

import VariantsList from "./components/VariantsList";
import * as Styled from "./styles/Variants.styled";
import { DeletionPopup, LoadingSpinner, Search } from "components/layouts";

export default function Variants() {
  const {
    status,
    variants: allVariants,
    getAllVariantsQuery,
    resetAllVariants,
  } = useVariantsGetQuery();

  const { activeDeletion, setActiveDeletion, onVariantDeleteQuery } =
    useVariantDeleteQuery();

  const [search, setSearch] = useState("");

  const { filteredArray: filteredVariants, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allVariants,
      filterHandler: (variant) =>
        variant.type.includes(search) ||
        variant.label_ka.includes(search) ||
        variant.label_en.includes(search) ||
        variant.description_ka.includes(search) ||
        variant.description_en.includes(search),
    });

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allVariants]);

  useEffect(() => {
    getAllVariantsQuery();

    return () => {
      resetAllVariants();
    };
  }, []);

  return (
    <Styled.Variants>
      <div>
        <Search
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
          placeholder="მოძებნე ვარიანტი..."
        />
      </div>

      {!status.loading && (
        <VariantsList
          filteredVariants={filteredVariants}
          setActiveDeletion={setActiveDeletion}
        />
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="ვარიანტი"
          onClose={() => setActiveDeletion("")}
          onConfirm={onVariantDeleteQuery}
        />
      )}
    </Styled.Variants>
  );
}
