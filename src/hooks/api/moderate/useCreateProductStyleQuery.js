import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProductStyleForm } from "store/selectors/moderateSelectors";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";
import { CreateProductStyleValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateProductStyleQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectProductStyleForm);

  const productStyleValidation = new CreateProductStyleValidation();

  const [error, setError] = useState(productStyleValidation.error);

  function createProductStyleQuery() {
    const validation = productStyleValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "isUpdating",
      "updatingProductStyleId",
    ]);

    credentials.isUpdating
      ? dispatch(productStyleActions.updateProductStyle(checkedData))
      : dispatch(productStyleActions.createProductStyle(checkedData));
  }

  return { createProductStyleQuery, error };
}
