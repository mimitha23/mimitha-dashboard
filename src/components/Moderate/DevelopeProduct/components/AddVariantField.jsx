/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBlurOnBody } from "hooks/utils";
import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { CloseXIcon } from "components/layouts/Icons";
import * as Styled from "./styles/AddVariantField.styled";

export default function AddVariantField({ variants, error }) {
  const dispatch = useDispatch();

  const [openDropdownBox, setOpenDropdownBox] = useState(false);
  const [filteredDropdown, setFilteredDropdown] = useState([]);

  const { enteredVariant, variants: enteredVariants } = useSelector(
    selectDevelopeProductForm
  );

  const random_field_id = `variant-field__filterable-field`;
  const random_dropdown_id = `variant-field__filterable-dropdown`;

  const { onFocus, blur } = useBlurOnBody(
    () => {
      setOpenDropdownBox(true);
    },
    () => {
      setOpenDropdownBox(false);
    },
    [random_field_id, random_dropdown_id]
  );

  function onSearch(e) {
    dispatch(
      developeProductActions.setDevelopedProduct({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  function onSelect(variant) {
    dispatch(developeProductActions.selectVariant(variant));
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredDropdown(
        variants.filter((variant) =>
          enteredVariant
            ? variant.ka.includes(enteredVariant) ||
              variant.en.includes(enteredVariant) ||
              variant.type.includes(enteredVariant)
            : variant
        )
      );
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [enteredVariant, variants]);

  return (
    <Styled.AddVariantField>
      <label htmlFor="add-variant" className="add-variant__label">
        ვარიანტი
      </label>

      <input
        id="add-variant"
        className={`add-variant__btn ${random_field_id} ${
          error.hasError ? "error" : ""
        }`}
        placeholder="დაამატე ვარიანტი"
        name="enteredVariant"
        value={enteredVariant}
        onChange={onSearch}
        onFocus={onFocus}
      />

      {error.hasError && <p className="size-field__message">{error.message}</p>}

      <ul className="selected-variants__list">
        {enteredVariants.map((variant) => (
          <li className="selected-variants__item" key={variant._id}>
            <span className="selected-variants__item-type">{variant.type}</span>
            <span className="selected-variants__item-label">{variant.ka}</span>
            <button
              className="selected-variants__item-close--btn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(developeProductActions.removeVariant(variant._id));
              }}
            >
              <CloseXIcon />
            </button>
          </li>
        ))}
      </ul>

      {openDropdownBox && !blur && (
        <div className={`select-variant__dropdown ${random_dropdown_id}`}>
          <ul className="select-variant__dropdown-list">
            {filteredDropdown.map((variant) => (
              <li
                key={`dropdown--${variant._id}`}
                onClick={() => onSelect(variant)}
                className={`select-variant__dropdown-list--item ${
                  enteredVariants.some((v) => v._id === variant._id)
                    ? "selected"
                    : ""
                }`}
              >
                <span>{variant.type}</span>
                <span>{variant.ka}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Styled.AddVariantField>
  );
}
