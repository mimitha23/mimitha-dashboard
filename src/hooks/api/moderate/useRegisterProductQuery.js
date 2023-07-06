import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRegisterProductForm } from "store/selectors/moderateSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { RegisterProductValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useRegisterProductQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectRegisterProductForm);

  const registerProductValidation = new RegisterProductValidation();

  const [error, setError] = useState(registerProductValidation.error);

  function registerProductQuery() {
    const validation = registerProductValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;
    console.log({ credentials });
    const checkedData = generateLowerCaseData(credentials, ["warning"]);

    credentials.isUpdating
      ? dispatch(registerProductActions.updateupdate(checkedData))
      : dispatch(registerProductActions.registerProduct(checkedData));
  }

  return { registerProductQuery, error };
}
