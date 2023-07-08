/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllTextures,
  selectTextureStatus,
} from "store/selectors/moderate/textureSelectors";
import { textureActions } from "store/reducers/moderate/textureReducer";

import { PATHS } from "config/routes";
import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import { LoadingSpinner, DeletionPopup } from "components/layouts";
import Search from "../components/Search";
import * as Styled from "./styles/Textures.styled";

export default function Textures() {
  const navigate = useNavigate();
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

  function onEdit(texture) {
    dispatch(textureActions.setTextureDefaults(texture));
    navigate(PATHS.moderate_sidebar.createTexturePage.absolutePath);
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
        <ul className="all-textures__list">
          {filteredTextures.map((texture) => (
            <div className="all-textures--list__item-details" key={texture._id}>
              <div className="all-textures--list__item-details__label">
                <p>
                  <span>ka:</span>
                  &nbsp;
                  <span>{texture.ka}</span>
                </p>

                <p>
                  <span>en:</span>
                  &nbsp;
                  <span>{texture.en}</span>
                </p>
              </div>

              <div className="all-textures--list__item-details--actions">
                <button
                  className="all-textures--list__item-details--actions__btn edit"
                  onClick={() => onEdit(texture)}
                >
                  <EditIcon />
                </button>
                <button
                  className="all-textures--list__item-details--actions__btn delete"
                  onClick={() => setActiveDeletion(texture._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </ul>
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
