/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllProductStyles,
  selectProductStyleStatus,
} from "store/selectors/moderate/productStyleSelectors";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";

import { PATHS } from "config/routes";
import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import { DeletionPopup, LoadingSpinner } from "components/layouts";
import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import Search from "../components/Search";
import * as Styled from "./styles/ProductStyles.styled";

export default function ProductStyles() {
  const navigate = useNavigate();
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
        style.label.ka.includes(search) || style.label.en.includes(search),
    });

  function onDelete() {
    dispatch(productStyleActions.deleteProductStyle(activeDeletion));
    setActiveDeletion("");
  }

  function onEdit(style) {
    dispatch(productStyleActions.setProductStyleDefaults(style));
    navigate(PATHS.moderate_sidebar.createProductStylePage.absolutePath);
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
        <Search value={search} onSearch={(e) => setSearch(e.target.value)} />
      </div>

      {!status.loading && (
        <ul className="all-product--styles__list">
          {filteredProductStyles.map((style) => (
            <li key={style._id} className="all-product--styles__list-item">
              <div className="all-product--styles__list-item--label">
                <p>
                  <span>ka:</span>
                  &nbsp;
                  <span>{style.ka}</span>
                </p>
                <p>
                  <span>en:</span>
                  &nbsp;
                  <span>{style.en}</span>
                </p>
              </div>

              <div className="all-product--styles__list-item--actions">
                <button
                  className="all-product--styles__list-item--actions__btn edit"
                  onClick={() => onEdit(style)}
                >
                  <EditIcon />
                </button>
                <button
                  className="all-product--styles__list-item--actions__btn delete"
                  onClick={() => setActiveDeletion(style._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
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
