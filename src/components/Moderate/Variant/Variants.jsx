/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllVariants,
  selectVariantStatus,
} from "store/selectors/moderate/variantSelectors";
import { variantActions } from "store/reducers/moderate/variantReducer";
import { useDebounceOnSearch } from "hooks/utils";

import { DeletionPopup, LoadingSpinner, Search } from "components/layouts";
import VariantsList from "./components/VariantsList";
import * as Styled from "./styles/Variants.styled";

export default function Variants() {
  const dispatch = useDispatch();

  const allVariants = useSelector(selectAllVariants);
  const status = useSelector(selectVariantStatus);

  const [search, setSearch] = useState("");

  const [activeDeletion, setActiveDeletion] = useState("");

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

  function onDelete() {
    dispatch(variantActions.deleteVariant(activeDeletion));
    setActiveDeletion("");
  }

  useEffect(() => {
    dispatch(variantActions.getAllVariants());

    return () => {
      dispatch(variantActions.resetAllVariants());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allVariants]);

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
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.Variants>
  );
}
