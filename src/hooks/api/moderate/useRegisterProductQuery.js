import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRegisterProductForm } from "store/selectors/moderate/registerProductSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { RegisterProductValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useRegisterProductQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectRegisterProductForm);

  const registerProductValidation = new RegisterProductValidation().prepare(
    credentials
  );

  const [error, setError] = useState(registerProductValidation.error);

  function registerProductQuery() {
    const { error: validation } = registerProductValidation
      .validate(credentials)
      .validateTexturesPercentageSum(credentials.textures)
      .validateSameTextures(credentials.textures);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "warning",
      "media",
      "newThumbnail",
      "updatingRegisteredProductId",
    ]);

    credentials.isUpdating
      ? dispatch(registerProductActions.updateRegisteredProduct(checkedData))
      : dispatch(registerProductActions.registerProduct(checkedData));
  }

  return { registerProductQuery, error };
}
