import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectNavRoutesForm } from "store/selectors/app/navRoutesSelectors";
import { navRoutesActions } from "store/reducers/app/navigation/navRoutesReducer";
import { CreateNavRouteValidation } from "utils/validators/app";
import { generateLowerCaseData } from "functions";

export default function useCreateNavRouteQuery() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectNavRoutesForm);

  const navRouteValidation = new CreateNavRouteValidation();

  const [error, setError] = useState(navRouteValidation.error);

  function createNavRouteQuery() {
    const { error: validation } = navRouteValidation.validate(credentials);

    setError((prev) => ({ ...prev, ...validation }));

    if (validation.hasError) return;

    const checkedData = generateLowerCaseData(credentials, [
      "isUpdating",
      "updatingNavRouteId",
    ]);

    credentials.isUpdating
      ? dispatch(navRoutesActions.updateNavRoute(checkedData))
      : dispatch(navRoutesActions.createNavRoute(checkedData));
  }

  return { createNavRouteQuery, error };
}
