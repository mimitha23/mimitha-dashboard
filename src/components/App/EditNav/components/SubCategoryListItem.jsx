import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { navActions } from "store/reducers/app/navigation/navReducer";
import { selectNavSubCategoryTitle } from "store/selectors/app/navSelectors";

import { ArrowBottomIcon, ArrowTopIcon } from "components/layouts/Icons";
import ControlListButtons from "./ControlListButtons";
import SubCategoryTitle from "./SubCategoryTitle";

export default function SubCategoryListItem({
  children,
  categoryId,
  subCategoryId,
  onRemoveCategory,
  onAddCategory,
}) {
  const dispatch = useDispatch();

  const title = useSelector(
    selectNavSubCategoryTitle({ categoryId, subCategoryId })
  );

  const [showRoutes, setShowRoutes] = useState(false);

  function setTitle(e) {
    dispatch(
      navActions.setTitle({
        categoryId,
        subCategoryId,
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  return (
    <li className="edit-nav__blocks-list__item">
      <SubCategoryTitle onChange={setTitle} title={title} />

      <ControlListButtons onRemove={onRemoveCategory} onAdd={onAddCategory} />

      <div className="routes-box">
        <button
          className="toggle-routes__btn"
          onClick={() => setShowRoutes((prev) => !prev)}
        >
          <strong>კურსები</strong>
          {showRoutes ? <ArrowTopIcon /> : <ArrowBottomIcon />}
        </button>

        {showRoutes && children}
      </div>
    </li>
  );
}
