import { useSelector, useDispatch } from "react-redux";
import { selectActiveFilterDropdown } from "store/selectors/filterSelectors";
import { setActiveFilter } from "store/reducers/filterSlice";

export default function useFilter() {
  const dispatch = useDispatch();

  const activeFilterDropdown = useSelector(selectActiveFilterDropdown);

  function activateFilter({ filterType }) {
    dispatch(setActiveFilter({ filterType }));
  }

  return { activeFilterDropdown, activateFilter };
}
