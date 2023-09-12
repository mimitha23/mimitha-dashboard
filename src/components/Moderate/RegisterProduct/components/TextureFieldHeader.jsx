import { PlusIcon } from "components/layouts/Icons";

export default function TextureFieldHeader({ onAddField }) {
  return (
    <div className="texture-head">
      <label>ტექსტურა</label>
      <button
        className="add-texture--field__btn"
        onClick={(e) => {
          e.preventDefault();
          onAddField();
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
