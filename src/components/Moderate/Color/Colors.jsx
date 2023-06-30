/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllColors,
  selectColorStatus,
} from "store/selectors/moderateSelectors";
import { PATHS } from "config/routes";
import { colorActions } from "store/reducers/moderate/colorReducer";

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
  const [filteredColors, setFilteredColors] = useState([]);

  const [activeDeletion, setActiveDeletion] = useState(false);

  function onSearch(e) {
    const searchKey = e.target.value;
    setSearch(searchKey);
    setFilteredColors(() => {
      return allColors.filter(
        (color) =>
          color.label.ka.includes(searchKey) ||
          color.label.en.includes(searchKey) ||
          color.hex.includes(searchKey)
      );
    });
  }

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
  }, []);

  useEffect(() => {
    !status.loading && allColors[0] && setFilteredColors(allColors);
  }, [status.loading, allColors]);

  return (
    <Styled.Colors>
      <div className="all-colors__header">
        <Search value={search} onSearch={onSearch} />
      </div>

      {!status.loading && (
        <ul className="all-colors__list">
          {filteredColors.map((color) => (
            <Styled.ColorItem key={color._id} hex={color.hex}>
              <span className="all-colors__list-item--pattern"></span>
              <div className="all-colors__list-item--details">
                <span>{color.label["ka"]}</span>
                <button
                  className="all-colors__list-item--details__btn edit"
                  onClick={() => onEdit(color)}
                >
                  <EditIcon />
                </button>
                <button
                  className="all-colors__list-item--details__btn delete"
                  onClick={() => setActiveDeletion(color._id)}
                >
                  <DeleteIcon />
                </button>
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
