/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllProductStyles,
  selectProductStyleStatus,
} from "store/selectors/moderate/productStyleSelectors";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";
import { useDebounceOnSearch } from "hooks/utils";

import { LoadingSpinner, DeletionPopup, Search } from "components/layouts";
import StylesList from "./components/StylesList";
import * as Styled from "./styles/ProductStyles.styled";

export default function ProductStyles() {
  const dispatch = useDispatch();

  const allProductStyles = useSelector(selectAllProductStyles);
  const status = useSelector(selectProductStyleStatus);

  const [search, setSearch] = useState("");

  const [activeDeletion, setActiveDeletion] = useState("");

  const { filteredArray: filteredProductStyles, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allProductStyles,
      filterHandler: (style) =>
        style.ka.includes(search) || style.en.includes(search),
    });

  function onDelete() {
    dispatch(productStyleActions.deleteProductStyle(activeDeletion));
    setActiveDeletion("");
  }

  useEffect(() => {
    dispatch(productStyleActions.getAllProductStyles());

    return () => {
      dispatch(productStyleActions.resetAllProductStyles());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allProductStyles]);

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
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.ProductStyles>
  );
}
