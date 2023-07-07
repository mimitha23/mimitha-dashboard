import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectVariantForm } from "store/selectors/moderateSelectors";
import { variantActions } from "store/reducers/moderate/variantReducer";
import { CreateVariantValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateVariantQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectVariantForm);

  const variantValidation = new CreateVariantValidation(credentials.isUpdating);

  const [error, setError] = useState(variantValidation.error);

  function createVariantQuery() {
    const { error: validation } = variantValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "icon",
      "newIcon",
      "isUpdating",
      "updatingVariantId",
    ]);

    credentials.isUpdating
      ? dispatch(variantActions.updateVariant(checkedData))
      : dispatch(variantActions.createVariant(checkedData));
  }

  return { createVariantQuery, error };
}
