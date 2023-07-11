/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBlurOnBody } from "hooks/utils";
import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import EnteredVariants from "./EnteredVariants";
import DropdownList from "./DropdownList";
import * as Styled from "./AddVariantField.styled";

export default function AddVariantField({ error }) {
  const dispatch = useDispatch();

  const [openDropdownBox, setOpenDropdownBox] = useState(false);

  const { enteredVariant } = useSelector(selectDevelopeProductForm);

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

      <EnteredVariants />

      {openDropdownBox && !blur && (
        <DropdownList
          random_dropdown_id={random_dropdown_id}
          enteredVariant={enteredVariant}
        />
      )}
    </Styled.AddVariantField>
  );
}
