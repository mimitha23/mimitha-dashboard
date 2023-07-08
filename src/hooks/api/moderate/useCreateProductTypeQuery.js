import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProductTypeForm } from "store/selectors/moderate/productTypeSelectors";
import { productTypeActions } from "store/reducers/moderate/productTypeReducer";
import { CreateProductTypeValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateProductTypeQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectProductTypeForm);

  const productTypeValidation = new CreateProductTypeValidation();

  const [error, setError] = useState(productTypeValidation.error);

  function createProductTypeQuery() {
    const { error: validation } = productTypeValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "isUpdating",
      "updatingProductTypeId",
    ]);

    credentials.isUpdating
      ? dispatch(productTypeActions.updateProductType(checkedData))
      : dispatch(productTypeActions.createProductType(checkedData));
  }

  return { createProductTypeQuery, error };
}
