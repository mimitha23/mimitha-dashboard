/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  useTextureDeleteQuery,
  useTextureGetQuery,
} from "hooks/api/moderate/textures";
import { useDebounceOnSearch } from "hooks/utils";

import TexturesList from "./components/TexturesList";
import * as Styled from "./styles/Textures.styled";
import { LoadingSpinner, DeletionPopup, Search } from "components/layouts";

export default function Textures() {
  const { activeDeletion, setActiveDeletion, onTextureDeleteQuery } =
    useTextureDeleteQuery();

  const { status, textures, getAllTexturesQuery, resetAllTextures } =
    useTextureGetQuery();

  const [search, setSearch] = useState("");

  const { filteredArray: filteredTextures, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: textures,
      filterHandler: (texture) =>
        texture.ka.includes(search) || texture.en.includes(search),
    });

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, textures]);

  useEffect(() => {
    getAllTexturesQuery();

    return () => {
      resetAllTextures();
    };
  }, []);

  return (
    <Styled.Textures>
      <div>
        <Search
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
          placeholder="მოძებნე ტექსტურა..."
        />
      </div>

      {!status.loading && (
        <TexturesList
          filteredTextures={filteredTextures}
          setActiveDeletion={setActiveDeletion}
        />
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="ტექსტურა"
          onClose={() => setActiveDeletion("")}
          onConfirm={onTextureDeleteQuery}
        />
      )}
    </Styled.Textures>
  );
}
