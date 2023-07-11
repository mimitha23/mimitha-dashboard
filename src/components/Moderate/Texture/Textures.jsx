/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllTextures,
  selectTextureStatus,
} from "store/selectors/moderate/textureSelectors";
import { textureActions } from "store/reducers/moderate/textureReducer";

import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import { LoadingSpinner, DeletionPopup } from "components/layouts";
import Search from "../components/Search";
import TexturesList from "./components/TexturesList";
import * as Styled from "./styles/Textures.styled";

export default function Textures() {
  const dispatch = useDispatch();

  const allTextures = useSelector(selectAllTextures);
  const status = useSelector(selectTextureStatus);

  const [search, setSearch] = useState("");

  const [activeDeletion, setActiveDeletion] = useState("");

  const { filteredArray: filteredTextures, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allTextures,
      filterHandler: (texture) =>
        texture.ka.includes(search) || texture.en.includes(search),
    });

  function onDelete() {
    dispatch(textureActions.deleteTexture(activeDeletion));
    setActiveDeletion("");
  }

  useEffect(() => {
    dispatch(textureActions.getAllTextures());

    return () => {
      dispatch(textureActions.resetAllTextures());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allTextures]);

  return (
    <Styled.Textures>
      <div>
        <Search value={search} onSearch={(e) => setSearch(e.target.value)} />
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
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.Textures>
  );
}
