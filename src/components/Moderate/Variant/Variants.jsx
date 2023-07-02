/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectAllVariants,
  selectVariantStatus,
} from "store/selectors/moderateSelectors";
import { variantActions } from "store/reducers/moderate/variantReducer";

import { PATHS } from "config/routes";
import useDebounceOnSearch from "../hooks/useDebounceOnSearch";

import {
  DeletionPopup,
  LoadingSpinner,
  LineClampedDescription,
} from "components/layouts";
import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import Search from "../components/Search";
import * as Styled from "./styles/Variants.styled";

export default function Variants() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allVariants = useSelector(selectAllVariants);
  const status = useSelector(selectVariantStatus);

  const [search, setSearch] = useState("");

  const [activeDeletion, setActiveDeletion] = useState("");

  const { filteredArray: filteredVariants, setDefaultArray } =
    useDebounceOnSearch({
      search,
      array: allVariants,
      filterHandler: (variant) =>
        variant.label.ka.includes(search) ||
        variant.label.en.includes(search) ||
        variant.type.includes(search) ||
        variant.description.includes(search),
    });

  function onDelete() {
    dispatch(variantActions.deleteVariant(activeDeletion));
    setActiveDeletion("");
  }

  function onEdit(variant) {
    dispatch(variantActions.setVariantDefaults(variant));
    navigate(PATHS.moderate_sidebar.createVariantPage.absolutePath);
  }

  useEffect(() => {
    dispatch(variantActions.getAllVariants());

    return () => {
      dispatch(variantActions.resetAllVariants());
    };
  }, []);

  useEffect(() => {
    !status.loading && setDefaultArray();
  }, [status.loading, allVariants]);

  return (
    <Styled.Variants>
      <div>
        <Search value={search} onSearch={(e) => setSearch(e.target.value)} />
      </div>

      {!status.loading && (
        <ul className="all-variants__list">
          {filteredVariants.map((variant) => (
            <li key={variant._id} className="all-variants__list-item">
              <figure className="all-variants__list-item--icon">
                <svg>
                  <image xlinkHref={variant.icon} />
                </svg>
              </figure>

              <div className="all-variants__list-item--body">
                <p>
                  <span>type:</span>
                  &nbsp;
                  <span>{variant.type}</span>
                </p>

                <div className="all-variants__list-item--label">
                  <p>
                    <span>ka:</span>
                    &nbsp;
                    <span>{variant.label.ka}</span>
                  </p>
                  <p>
                    <span>en:</span>
                    &nbsp;
                    <span>{variant.label.en}</span>
                  </p>
                </div>

                <LineClampedDescription clamp={2} text={variant.description} />

                <div className="all-variants__list-item--actions">
                  <button
                    className="all-variants__list-item--actions__btn edit"
                    onClick={() => onEdit(variant)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="all-variants__list-item--actions__btn delete"
                    onClick={() => setActiveDeletion(variant._id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {status.loading && <LoadingSpinner />}

      {activeDeletion && (
        <DeletionPopup
          targetName="ვარიანტი"
          onClose={() => setActiveDeletion("")}
          onConfirm={() => onDelete()}
        />
      )}
    </Styled.Variants>
  );
}
