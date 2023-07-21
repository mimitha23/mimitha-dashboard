import { useSelector, useDispatch } from "react-redux";

import { navActions } from "store/reducers/app/navigation/navReducer";
import { selectAllNavRoutesWithCaption } from "store/selectors/app/navRoutesSelectors";
import { selectSubCategoryRoutes } from "store/selectors/app/navSelectors";

import ControlListButtons from "./ControlListButtons";
import { InputFilterableSelect } from "components/layouts";

export default function RoutesListItem({
  route,
  categoryId,
  subCategoryId,
  routeIndex,
}) {
  const dispatch = useDispatch();

  const navRoutes = useSelector(selectAllNavRoutesWithCaption);
  const selectedRoutes = useSelector(
    selectSubCategoryRoutes({ categoryId, subCategoryId })
  );

  function setRoute({ value }) {
    dispatch(
      navActions.setRoute({
        value,
        categoryId,
        subCategoryId,
        routeId: route._id,
      })
    );
  }

  function selectRoute({ value }) {
    dispatch(
      navActions.selectRoute({
        value,
        categoryId,
        subCategoryId,
        routeId: route._id,
      })
    );
  }

  function onAddRoute() {
    dispatch(
      navActions.addRoute({
        categoryId,
        subCategoryId,
        placeAfterIndex: routeIndex + 1,
      })
    );
  }

  function onRemoveRoute() {
    dispatch(
      navActions.removeRoute({
        categoryId,
        subCategoryId,
        routeId: route._id,
      })
    );
  }

  return (
    <li className="routes-box__list-item">
      <ControlListButtons onAdd={onAddRoute} onRemove={onRemoveRoute} />
      &mdash;&nbsp;&nbsp;
      <InputFilterableSelect
        list={navRoutes}
        selectedList={selectedRoutes}
        id="1"
        name="route"
        placeholder="კურსი"
        value={route.caption}
        setValue={({ value }) => setRoute({ value })}
        selectValue={({ value }) => selectRoute({ value })}
      />
    </li>
  );
}
