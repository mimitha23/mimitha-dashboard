import { useState } from "react";

import { ArrowBottomIcon, ArrowTopIcon } from "components/layouts/Icons";
import ControlListButtons from "./ControlListButtons";
import SubCategoryTitle from "./SubCategoryTitle";

export default function SubCategoryListItem({
  children,
  form,
  onRemoveCategory,
  onAddCategory,
}) {
  const [showRoutes, setShowRoutes] = useState(false);

  return (
    <li className="edit-nav__blocks-list__item">
      <SubCategoryTitle form={form} />

      <ControlListButtons onRemove={onRemoveCategory} onAdd={onAddCategory} />

      <div className="routes-box">
        <button
          className="toggle-routes__btn"
          onClick={(e) => {
            e.preventDefault();
            setShowRoutes((prev) => !prev);
          }}
        >
          <strong>კურსები</strong>
          {showRoutes ? <ArrowTopIcon /> : <ArrowBottomIcon />}
        </button>

        {showRoutes && children}
      </div>
    </li>
  );
}
