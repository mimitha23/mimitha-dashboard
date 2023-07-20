import { PlusIcon } from "components/layouts/Icons";

export default function AddSubCategoryButton({ onClick }) {
  return (
    <button className="add-category__btn" onClick={onClick}>
      <span>დაამატე ქვე-კატეგორია</span>
      <span>
        <PlusIcon />
      </span>
    </button>
  );
}
