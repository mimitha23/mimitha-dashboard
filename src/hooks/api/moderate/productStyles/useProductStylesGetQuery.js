import { useDispatch, useSelector } from "react-redux";

import { productStyleActions } from "store/reducers/moderate/productStyleReducer";
import * as productStyleSelectors from "store/selectors/moderate/productStyleSelectors";

export default function useProductStylesGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(productStyleSelectors.selectProductStyleStatus);
  const productStyles = useSelector(
    productStyleSelectors.selectAllProductStyles
  );

  const getAllProductStylesQuery = () =>
    dispatch(productStyleActions.getAllProductStyles());

  const resetAllProductStyles = () =>
    dispatch(productStyleActions.resetAllProductStyles());

  return {
    status,
    productStyles,
    getAllProductStylesQuery,
    resetAllProductStyles,
  };
}
