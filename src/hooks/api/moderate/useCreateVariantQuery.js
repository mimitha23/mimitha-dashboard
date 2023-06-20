import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateVariant } from "store/selectors/moderateSelectors";
import { createVariant } from "store/reducers/moderate/createVariantReducer";
import { CreateVariantValidation } from "utils/validators/moderate";

export default function useCreateVariantQuery() {
  const dispatch = useDispatch();
  const { variantType, label_ka, label_en, description } =
    useSelector(selectCreateVariant);

  const variantValidation = new CreateVariantValidation();

  const [error, setError] = useState(variantValidation.error);

  function createVariantQuery() {
    const validation = variantValidation.validate({
      variantType,
      label_ka,
      label_en,
      description,
    });

    setError(validation);

    if (!validation.hasError)
      dispatch(createVariant({ variantType, label_ka, label_en, description }));
  }

  return { createVariantQuery, error };
}
