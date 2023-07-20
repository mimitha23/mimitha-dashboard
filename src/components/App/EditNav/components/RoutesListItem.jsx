import { useSelector, useDispatch } from "react-redux";

import { navActions } from "store/reducers/app/navigation/navReducer";
import { selectAllNavRoutesWithCaption } from "store/selectors/app/navRoutesSelectors";

import ControlListButtons from "./ControlListButtons";
import { InputFilterableSelect } from "components/layouts";

export default function RoutesListItem({ route, categoryId, subCategoryId }) {
  const dispatch = useDispatch();

  const navRoutes = useSelector(selectAllNavRoutesWithCaption);

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

  return (
    <li className="routes-box__list-item">
      <ControlListButtons />
      &mdash;&nbsp;&nbsp;
      <InputFilterableSelect
        list={navRoutes}
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
