import { CloseXIcon, PlusIcon } from "components/layouts/Icons";

export default function ControlListButtons() {
  return (
    <div className="control-list--buttons__box">
      <button className="remove__btn" title="მოაშორე ქვე-კატეგორია">
        <CloseXIcon />
      </button>
      <button className="add-after__btn" title="დაამატე ქვე-კატეგორია შემდგომ">
        <PlusIcon />
      </button>
    </div>
  );
}
