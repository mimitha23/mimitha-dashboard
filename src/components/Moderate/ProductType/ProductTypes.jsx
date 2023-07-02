/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllProductTypes,
  selectProductTypeStatus,
} from "store/selectors/moderateSelectors";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";

import { PATHS } from "config/routes";
import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import { DeletionPopup, LoadingSpinner } from "components/layouts";
import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import Search from "../components/Search";
import * as Styled from "./styles/ProductTypes.styled";

export default function ProductTypes() {
  const navigate = useNavigate();
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

  function onEdit(variant) {
    dispatch(productTypeActions.setProductTypeDefaults(variant));
    navigate(PATHS.moderate_sidebar.createProductTypePage.absolutePath);
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
        <ul className="all-product--types__list">
          {filteredProductTypes.map((type) => (
            <li key={type._id} className="all-product--types__list-item">
              <div className="all-product--types__list-item--label">
                <p>
                  <span>ka:</span>
                  &nbsp;
                  <span>{type.label.ka}</span>
                </p>
                <p>
                  <span>en:</span>
                  &nbsp;
                  <span>{type.label.en}</span>
                </p>
              </div>

              <div className="all-product--types__list-item--actions">
                <button
                  className="all-product--types__list-item--actions__btn edit"
                  onClick={() => onEdit(type)}
                >
                  <EditIcon />
                </button>
                <button
                  className="all-product--types__list-item--actions__btn delete"
                  onClick={() => setActiveDeletion(type._id)}
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
    </Styled.ProductTypes>
  );
}
