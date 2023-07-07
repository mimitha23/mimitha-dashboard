import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectColorForm } from "store/selectors/moderateSelectors";
import { colorActions } from "store/reducers/moderate/colorReducer";
import { CreateColorValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useCreateColorQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectColorForm);

  const colorValidation = new CreateColorValidation();

  const [error, setError] = useState(colorValidation.error);

  function createColorQuery() {
    const { error: validation } = colorValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "isUpdating",
      "updatingColorId",
    ]);

    credentials.isUpdating
      ? dispatch(colorActions.updateColor(checkedData))
      : dispatch(colorActions.createColor(checkedData));
  }

  return { createColorQuery, error };
}
