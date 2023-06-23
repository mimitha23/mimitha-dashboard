import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateProductType } from "store/selectors/moderateSelectors";
import { createProductTypeActions } from "store/reducers/moderate/createProductTypeReducer";
import { CreateProductTypeValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateProductTypeQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCreateProductType);

  const productTypeValidation = new CreateProductTypeValidation();

  const [error, setError] = useState(productTypeValidation.error);

  function createProductTypeQuery() {
    const validation = productTypeValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials);

    dispatch(createProductTypeActions.createProductType(checkedData));
  }

  return { createProductTypeQuery, error };
}
