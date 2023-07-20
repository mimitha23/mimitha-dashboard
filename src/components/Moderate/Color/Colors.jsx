/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllColors,
  selectColorStatus,
} from "store/selectors/moderate/colorSelectors";
import { colorActions } from "store/reducers/moderate/colorReducer";
import { useDebounceOnSearch } from "hooks/utils";

import { LoadingSpinner, DeletionPopup, Search } from "components/layouts";
import ColorsList from "./components/ColorsList";
import * as Styled from "./styles/Colors.styled";

export default function Colors() {
  const dispatch = useDispatch();
  const allColors = useSelector(selectAllColors);
  const status = useSelector(selectColorStatus);

  const [search, setSearch] = useState("");
  const [activeDeletion, setActiveDeletion] = useState("");

  const { filteredArray: filteredColors, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allColors,
      filterHandler: (color) =>
        color.ka.includes(search) ||
        color.en.includes(search) ||
        color.hex.includes(search),
    });

  function onDelete() {
    dispatch(colorActions.deleteColor(activeDeletion));
    setActiveDeletion("");
  }

  useEffect(() => {
    dispatch(colorActions.getAllColors());

    return () => {
      dispatch(colorActions.resetAllColors());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allColors]);

  return (
    <Styled.Colors>
      <div>
        <Search
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
          placeholder="მოძებნე ფერი..."
        />
      </div>

      {!status.loading && (
        <ColorsList
          filteredColors={filteredColors}
          setActiveDeletion={setActiveDeletion}
        />
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="ფერი"
          onClose={() => setActiveDeletion("")}
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.Colors>
  );
}
