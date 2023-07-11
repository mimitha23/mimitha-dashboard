import { useDispatch } from "react-redux";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { MinusIcon } from "components/layouts/Icons";

export default function RemoveFieldButton({ sizeId }) {
  const dispatch = useDispatch();

  return (
    <button
      className="size-field__remove-btn"
      onClick={(e) => {
        e.preventDefault();
        dispatch(developeProductActions.removeSizeField(sizeId));
      }}
    >
      <MinusIcon />
    </button>
  );
}
