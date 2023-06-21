import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCreateVariant } from "store/selectors/moderateSelectors";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";
import { CreateVariantValidation } from "utils/validators/moderate";

export default function useCreateVariantQuery() {
  const dispatch = useDispatch();
  const { variantType, label_ka, label_en, description, icon } =
    useSelector(selectCreateVariant);

  const variantValidation = new CreateVariantValidation();

  const [error, setError] = useState(variantValidation.error);

  function createVariantQuery() {
    const validation = variantValidation.validate({
      variantType,
      label_ka,
      label_en,
      description,
      icon,
    });

    setError(validation);

    if (!validation.hasError)
      dispatch(
        createVariantActions.createVariant({
          variantType,
          label_ka,
          label_en,
          description,
          icon,
        })
      );
  }

  return { createVariantQuery, error };
}
