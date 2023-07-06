import { useDispatch } from "react-redux";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { PlusIcon } from "components/layouts/Icons";

export default function TextureFieldHeader() {
  const dispatch = useDispatch();

  return (
    <div className="texture-head">
      <label>ტექსტურა</label>
      <button
        className="add-texture--field__btn"
        onClick={(e) => {
          e.preventDefault();
          dispatch(registerProductActions.addTextureField());
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
