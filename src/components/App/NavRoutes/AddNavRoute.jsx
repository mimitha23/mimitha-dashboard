/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectNavRoutesForm,
  selectNavRoutesStatus,
} from "store/selectors/app/navRoutesSelectors";
import { PATHS } from "config/routes";
import { useCreateNavRouteQuery } from "hooks/api/app";
import { navRoutesActions } from "store/reducers/app/navigation/navRoutesReducer";

import {
  InputText,
  Form,
  Button,
  LoadingSpinner,
  FormHeader,
} from "components/layouts";
import * as Styled from "./AddNavRoute.styled";

export default function AddNavRoute() {
  const dispatch = useDispatch();

  const status = useSelector(selectNavRoutesStatus);
  const { label_en, label_ka, isUpdating } = useSelector(selectNavRoutesForm);

  const { createNavRouteQuery, error } = useCreateNavRouteQuery();

  function handleFormChange(e) {
    dispatch(
      navRoutesActions.setNavRouteForm({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  useEffect(() => {
    return () => {
      dispatch(navRoutesActions.resetState());
    };
  }, []);

  return (
    <Styled.AddNavRoute>
      <FormHeader
        title="შექმენი ნავიგაციის კურსი"
        linkCaption="ნახე ყველა კურსი"
        redirectPath={PATHS.app_nested_routes.routesPage.relativePath()}
      />

      <Form>
        <InputText
          id="route-label--ka"
          label="იარლიყი (ka)"
          name="label_ka"
          placeholder="სპორტული"
          error={error.label_ka.hasError}
          message={error.label_ka.message}
          value={label_ka}
          onChange={handleFormChange}
        />

        <InputText
          id="route-label--en"
          label="იარლიყი (en)"
          name="label_en"
          placeholder="sportswear"
          error={error.label_en.hasError}
          message={error.label_en.message}
          value={label_en}
          onChange={handleFormChange}
        />

        <Button
          caption={isUpdating ? "განახლება" : "შექმნა"}
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createNavRouteQuery();
          }}
        />
      </Form>

      {status.loading && <LoadingSpinner />}
    </Styled.AddNavRoute>
  );
}
