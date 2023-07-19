import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectDevelopeProductForm,
  selectDevelopeProductFormSuggestions,
} from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

export default function DropdownList({ enteredVariant }) {
  const dispatch = useDispatch();

  const { variants: variantSuggestions } = useSelector(
    selectDevelopeProductFormSuggestions
  );
  const { variants: enteredVariants } = useSelector(selectDevelopeProductForm);

  function onSelect(variant) {
    dispatch(developeProductActions.selectVariant(variant));
  }

  const [filteredDropdown, setFilteredDropdown] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredDropdown(
        variantSuggestions.filter((variant) =>
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
  }, [enteredVariant, variantSuggestions]);

  return (
    <div className="select-variant__dropdown">
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
