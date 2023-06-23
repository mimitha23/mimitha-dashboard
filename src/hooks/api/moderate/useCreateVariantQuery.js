import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateVariant } from "store/selectors/moderateSelectors";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";
import { CreateVariantValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateVariantQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCreateVariant);

  const variantValidation = new CreateVariantValidation();

  const [error, setError] = useState(variantValidation.error);

  function createVariantQuery() {
    const validation = variantValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, ["icon"]);

    dispatch(createVariantActions.createVariant(checkedData));
  }

  return { createVariantQuery, error };
}
