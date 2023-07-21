import { CloseXIcon, PlusIcon } from "components/layouts/Icons";

export default function ControlListButtons({ onRemove, onAdd }) {
  return (
    <div className="control-list--buttons__box">
      <button
        className="remove__btn"
        title="მოაშორე ქვე-კატეგორია"
        onClick={onRemove}
      >
        <CloseXIcon />
      </button>
      <button
        className="add-after__btn"
        title="დაამატე ქვე-კატეგორია შემდგომ"
        onClick={onAdd}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
