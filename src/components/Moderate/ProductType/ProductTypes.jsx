/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllProductTypes,
  selectProductTypeStatus,
} from "store/selectors/moderate/productTypeSelectors";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";

import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import { DeletionPopup, LoadingSpinner } from "components/layouts";
import Search from "../components/Search";
import TypesList from "./components/TypesList";
import * as Styled from "./styles/ProductTypes.styled";

export default function ProductTypes() {
  const dispatch = useDispatch();

  const allProductTypes = useSelector(selectAllProductTypes);
  const status = useSelector(selectProductTypeStatus);

  const [search, setSearch] = useState("");

  const [activeDeletion, setActiveDeletion] = useState("");

  const { filteredArray: filteredProductTypes, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allProductTypes,
      filterHandler: (type) =>
        type.label.ka.includes(search) || type.label.en.includes(search),
    });

  function onDelete() {
    dispatch(productTypeActions.deleteProductType(activeDeletion));
    setActiveDeletion("");
  }

  useEffect(() => {
    dispatch(productTypeActions.getAllProductTypes());

    return () => {
      dispatch(productTypeActions.resetAllProductTypes());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allProductTypes]);

  return (
    <Styled.ProductTypes>
      <div>
        <Search value={search} onSearch={(e) => setSearch(e.target.value)} />
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
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.ProductTypes>
  );
}
