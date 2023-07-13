/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useClickOutside } from "hooks/utils";
import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import EnteredVariants from "./EnteredVariants";
import DropdownList from "./DropdownList";
import * as Styled from "./AddVariantField.styled";

export default function AddVariantField({ error }) {
  const dispatch = useDispatch();

  const [openDropdownBox, setOpenDropdownBox] = useState(false);

  const { enteredVariant } = useSelector(selectDevelopeProductForm);

  function onSearch(e) {
    dispatch(
      developeProductActions.setDevelopedProduct({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  const dropdown_ref = useClickOutside(openDropdownBox, () =>
    setOpenDropdownBox(false)
  );

  return (
    <Styled.AddVariantField ref={dropdown_ref}>
      <label htmlFor="add-variant" className="add-variant__label">
        ვარიანტი
      </label>

      <input
        id="add-variant"
        className={`add-variant__btn  ${error.hasError ? "error" : ""}`}
        placeholder="დაამატე ვარიანტი"
        name="enteredVariant"
        value={enteredVariant}
        onChange={onSearch}
        onFocus={() => setOpenDropdownBox(true)}
      />

      {error.hasError && <p className="size-field__message">{error.message}</p>}

      <EnteredVariants />

      {openDropdownBox && <DropdownList enteredVariant={enteredVariant} />}
    </Styled.AddVariantField>
  );
}
