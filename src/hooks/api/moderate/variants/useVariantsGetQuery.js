import { useDispatch, useSelector } from "react-redux";

import * as variantSelectors from "store/selectors/moderate/variantSelectors";
import { variantActions } from "store/reducers/moderate/variantReducer";

export default function useVariantsGetQuery() {
  const dispatch = useDispatch();

  const status = useSelector(variantSelectors.selectVariantStatus);
  const variants = useSelector(variantSelectors.selectAllVariants);
  const existingVariants = useSelector(
    variantSelectors.selectExistingVariantTypes
  );

  const getAllVariantsQuery = () => dispatch(variantActions.getAllVariants());

  const resetAllVariants = () => dispatch(variantActions.resetAllVariants());

  const getExistingVariantsQuery = () =>
    dispatch(variantActions.getExistingVariantTypes());

  const resetVariantsState = () => dispatch(variantActions.resetState());

  return {
    status,
    variants,
    getAllVariantsQuery,
    resetAllVariants,
    getExistingVariantsQuery,
    existingVariants,
    resetVariantsState,
  };
}
