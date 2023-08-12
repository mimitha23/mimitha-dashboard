import { useDispatch, useSelector } from "react-redux";

import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { CloseXIcon } from "components/layouts/Icons";

export default function EnteredVariants() {
  const dispatch = useDispatch();
  const { variants: enteredVariants } = useSelector(selectDevelopeProductForm);

  const onRemove = (id) => dispatch(developeProductActions.removeVariant(id));

  return (
    <ul className="selected-variants__list">
      {enteredVariants.map((variant) => (
        <li className="selected-variants__item" key={variant._id}>
          <span className="selected-variants__item-type">{variant.type}</span>
          <span className="selected-variants__item-label">
            {variant.description_ka}
          </span>
          <button
            className="selected-variants__item-close--btn"
            onClick={(e) => {
              e.preventDefault();
              onRemove(variant._id);
            }}
          >
            <CloseXIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
