import { useDispatch, useSelector } from "react-redux";

import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";

export default function useRegisterProductGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(
    registerProductSelectors.selectRegisterProductStatus
  );

  const registeredProducts = useSelector(
    registerProductSelectors.selectAllRegisteredProducts
  );

  const getAllRegisteredProductsQuery = () =>
    dispatch(registerProductActions.getAllRegisteredProducts());

  return { status, registeredProducts, getAllRegisteredProductsQuery };
}
