import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTextureForm } from "store/selectors/moderate/textureSelectors";
import { textureActions } from "store/reducers/moderate/textureReducer";
import { CreateTextureValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "functions";

export default function useCreateColorQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectTextureForm);

  const textureValidation = new CreateTextureValidation();

  const [error, setError] = useState(textureValidation.error);

  function createTextureQuery() {
    const { error: validation } = textureValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "isUpdating",
      "updatingColorId",
    ]);

    credentials.isUpdating
      ? dispatch(textureActions.updateTexture(checkedData))
      : dispatch(textureActions.createTexture(checkedData));
  }

  return { createTextureQuery, error };
}
