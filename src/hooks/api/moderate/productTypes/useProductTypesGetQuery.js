import { useDispatch, useSelector } from "react-redux";

import { productTypeActions } from "store/reducers/moderate/productTypeReducer";
import * as productTypeSelectors from "store/selectors/moderate/productTypeSelectors";

export default function useProductTypesGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(productTypeSelectors.selectProductTypeStatus);
  const productTypes = useSelector(productTypeSelectors.selectAllProductTypes);

  const getAllProductTypesQuery = () =>
    dispatch(productTypeActions.getAllProductTypes());

  const resetAllProductTypes = () =>
    dispatch(productTypeActions.resetAllProductTypes());

  return {
    status,
    productTypes,
    getAllProductTypesQuery,
    resetAllProductTypes,
  };
}
