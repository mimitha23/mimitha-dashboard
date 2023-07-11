import { useDispatch } from "react-redux";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { PlusIcon } from "components/layouts/Icons";

export default function SizeFieldHeader() {
  const dispatch = useDispatch();

  return (
    <div className="size-field__header">
      <label>ზომა</label>
      <button
        className="size-field__add-btn"
        onClick={(e) => {
          e.preventDefault();
          dispatch(developeProductActions.addSizeField());
        }}
      >
        <span>დაამატე ველი</span>
        <span>
          <PlusIcon />
        </span>
      </button>
    </div>
  );
}
