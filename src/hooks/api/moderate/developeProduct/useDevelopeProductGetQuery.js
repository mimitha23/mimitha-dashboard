import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import * as developeProductSelectors from "store/selectors/moderate/developeProductSelectors";

export default function useDevelopeProductGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(
    developeProductSelectors.selectDevelopeProductStatus
  );

  const activeProductStatus = useSelector(
    developeProductSelectors.selectSingleDevelopeProductStatus
  );

  const activeProduct = useSelector(
    developeProductSelectors.selectDevelopedProduct
  );

  const { registeredProductId, developedProductId } = useParams();

  // Query

  const getAllDevelopedProductsQuery = () =>
    dispatch(
      developeProductActions.getAllDevelopedProducts({ registeredProductId })
    );

  const getActiveDevelopedProductQuery = () =>
    dispatch(
      developeProductActions.getDevelopedProduct({
        registeredProductId,
        developedProductId,
      })
    );

  const getConfigCopyQuery = (key) =>
    dispatch(
      developeProductActions.copyDevelopedProductConfig({
        registeredProductId,
        params: `${key}=-1`,
      })
    );

  const resetActiveProduct = () =>
    dispatch(developeProductActions.resetDevelopedProduct());

  const resetDevelopeProductFormState = () =>
    dispatch(developeProductActions.resetFormState());

  return {
    status,
    getAllDevelopedProductsQuery,
    activeProductStatus,
    getActiveDevelopedProductQuery,
    resetActiveProduct,
    activeProduct,
    getConfigCopyQuery,
    resetDevelopeProductFormState,
    registeredProductId,
    developedProductId,
  };
}
