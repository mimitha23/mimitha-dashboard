import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectDevelopeProductForm,
  selectDevelopeProductFormSugestions,
} from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

export default function DropdownList({ random_dropdown_id, enteredVariant }) {
  const dispatch = useDispatch();

  const { variants: variantSugestions } = useSelector(
    selectDevelopeProductFormSugestions
  );
  const { variants: enteredVariants } = useSelector(selectDevelopeProductForm);

  function onSelect(variant) {
    dispatch(developeProductActions.selectVariant(variant));
  }

  const [filteredDropdown, setFilteredDropdown] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredDropdown(
        variantSugestions.filter((variant) =>
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
  }, [enteredVariant, variantSugestions]);

  return (
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
  );
}