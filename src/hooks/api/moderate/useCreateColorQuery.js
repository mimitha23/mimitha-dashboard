import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateColor } from "store/selectors/moderateSelectors";
import { createColorActions } from "store/reducers/moderate/createColorReducer";
import { CreateColorValidation } from "utils/validators/moderate";

export default function useCreateColorQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCreateColor);

  const colorValidation = new CreateColorValidation();

  const [error, setError] = useState(colorValidation.error);

  function createColorQuery() {
    const validation = colorValidation.validate(credentials);

    setError(validation);

    if (!validation.hasError)
      dispatch(createColorActions.createColor(credentials));
  }

  return { createColorQuery, error };
}
