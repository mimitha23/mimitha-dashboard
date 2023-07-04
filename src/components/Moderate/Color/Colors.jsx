/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllColors,
  selectColorStatus,
} from "store/selectors/moderateSelectors";
import { colorActions } from "store/reducers/moderate/colorReducer";

import { PATHS } from "config/routes";
import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import { LoadingSpinner, DeletionPopup } from "components/layouts";
import Search from "../components/Search";
import * as Styled from "./styles/Colors.styled";

export default function Colors() {
  const navigate = useNavigate();
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
        color.label.ka.includes(search) ||
        color.label.en.includes(search) ||
        color.hex.includes(search),
    });

  function onDelete() {
    dispatch(colorActions.deleteColor(activeDeletion));
    setActiveDeletion("");
  }

  function onEdit(color) {
    dispatch(colorActions.setColorDefaults(color));
    navigate(PATHS.moderate_sidebar.createColorPage.absolutePath);
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
        <Search value={search} onSearch={(e) => setSearch(e.target.value)} />
      </div>

      {!status.loading && (
        <ul className="all-colors__list">
          {filteredColors.map((color) => (
            <Styled.ColorItem key={color._id} hex={color.hex}>
              <span className="all-colors--list__item-pattern"></span>
              <div className="all-colors--list__item-details">
                <div className="all-colors--list__item-details__label">
                  <p>
                    <span>ka:</span>
                    &nbsp;
                    <span>{color.label.ka}</span>
                  </p>

                  <p>
                    <span>en:</span>
                    &nbsp;
                    <span>{color.label.en}</span>
                  </p>
                </div>

                <div className="all-colors--list__item-details--actions">
                  <button
                    className="all-colors--list__item-details--actions__btn edit"
                    onClick={() => onEdit(color)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="all-colors--list__item-details--actions__btn delete"
                    onClick={() => setActiveDeletion(color._id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </Styled.ColorItem>
          ))}
        </ul>
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
