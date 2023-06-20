import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateColor } from "store/selectors/moderateSelectors";
import { createColor } from "store/reducers/moderate/createColorReducer";
import { CreateColorValidation } from "utils/validators/moderate";

export default function useCreateColorQuery() {
  const dispatch = useDispatch();
  const { color_en, color_hex, color_ka } = useSelector(selectCreateColor);

  const colorValidation = new CreateColorValidation();

  const [error, setError] = useState(colorValidation.error);

  function createColorQuery() {
    const validation = colorValidation.validate({
      color_ka,
      color_en,
      color_hex,
    });

    setError(validation);

    if (!validation.hasError)
      dispatch(createColor(color_en, color_ka, color_hex));
  }

  return { createColorQuery, error };
}
