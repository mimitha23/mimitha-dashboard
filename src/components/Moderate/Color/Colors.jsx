/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  useColorDeleteQuery,
  useColorsGetQuery,
} from "hooks/api/moderate/colors";
import { useDebounceOnSearch } from "hooks/utils";

import ColorsList from "./components/ColorsList";
import * as Styled from "./styles/Colors.styled";
import { LoadingSpinner, DeletionPopup, Search } from "components/layouts";

export default function Colors() {
  const [search, setSearch] = useState("");

  const { colors, status, getAllColorsQuery, resetAllColors } =
    useColorsGetQuery();

  const { onColorDeleteQuery, activeDeletion, setActiveDeletion } =
    useColorDeleteQuery();

  const { filteredArray: filteredColors, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: colors,
      filterHandler: (color) =>
        color.ka.includes(search) ||
        color.en.includes(search) ||
        color.hex.includes(search),
    });

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, colors]);

  useEffect(() => {
    getAllColorsQuery();

    return () => {
      resetAllColors();
    };
  }, []);

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
          onConfirm={onColorDeleteQuery}
        />
      )}
    </Styled.Colors>
  );
}
