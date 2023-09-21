import { useDispatch, useSelector } from "react-redux";

import { colorActions } from "store/reducers/moderate/colorReducer";
import * as colorSelectors from "store/selectors/moderate/colorSelectors";

export default function useColorsGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(colorSelectors.selectColorStatus);

  const colors = useSelector(colorSelectors.selectAllColors);

  const getAllColorsQuery = () => dispatch(colorActions.getAllColors());

  const resetAllColors = () => dispatch(colorActions.resetAllColors());

  return { getAllColorsQuery, colors, status, resetAllColors };
}
