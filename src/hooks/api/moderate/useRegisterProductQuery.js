import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRegisterProduct } from "store/selectors/moderateSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { RegisterProductValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useRegisterProductQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectRegisterProduct);

  const registerProductValidation = new RegisterProductValidation();

  const [error, setError] = useState(registerProductValidation.error);

  function registerProductQuery() {
    const validation = registerProductValidation.validate({
      productType: credentials.productType,
      gender: credentials.gender,
      styles: credentials.styles,
    });

    setError((prev) => ({ ...prev, ...validation }));
    console.log({ validation });
    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials);

    // dispatch(registerProductActions.registerProduct(checkedData));
  }

  return { registerProductQuery, error };
}
