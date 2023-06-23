import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateProductStyle } from "store/selectors/moderateSelectors";
import { createProductStyleActions } from "store/reducers/moderate/createProductStyleReducer";
import { CreateProductStyleValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateProductStyleQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCreateProductStyle);

  const productStyleValidation = new CreateProductStyleValidation();

  const [error, setError] = useState(productStyleValidation.error);

  function createProductStyleQuery() {
    const validation = productStyleValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials);

    dispatch(createProductStyleActions.createProductStyle(checkedData));
  }

  return { createProductStyleQuery, error };
}
