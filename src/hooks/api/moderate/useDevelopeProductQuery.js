import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";
import { DevelopeProductValidation } from "utils/validators/moderate";
import { generateLowerCaseData } from "utils";

export default function useDevelopeProductQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectDevelopeProductForm);

  const { registeredProductId } = useParams();

  const developeProductValidation = new DevelopeProductValidation().prepare(
    credentials
  );

  const [error, setError] = useState(developeProductValidation.error);

  function developeProductQuery() {
    if (!registeredProductId) return;

    const { error: validation } =
      developeProductValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "assets",
      "filesToDelete",
      "filesToUpload",
      "updatingDevelopedProductId",
    ]);

    credentials.isUpdating
      ? dispatch(
          developeProductActions.updateDevelopedProduct({
            ...checkedData,
            registeredProductId,
          })
        )
      : dispatch(
          developeProductActions.attachDevelopedProduct({
            ...checkedData,
            registeredProductId,
          })
        );
  }

  return { developeProductQuery, error };
}
