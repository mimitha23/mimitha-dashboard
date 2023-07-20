/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectProductStyleForm,
  selectProductStyleStatus,
} from "store/selectors/moderate/productStyleSelectors";
import { useCreateProductStyleQuery } from "hooks/api/moderate";
import { productStyleActions } from "store/reducers/moderate/productStyleReducer";

import { PATHS } from "config/routes";

import {
  Form,
  InputText,
  Button,
  LoadingSpinner,
  FormHeader,
} from "components/layouts";
import * as Styled from "./styles/CreateProductStyle.styled";

export default function CreateProductStyle() {
  const dispatch = useDispatch();
  const status = useSelector(selectProductStyleStatus);
  const { label_ka, label_en, isUpdating } = useSelector(
    selectProductStyleForm
  );

  const { createProductStyleQuery, error } = useCreateProductStyleQuery();

  const handleSetProductStyle = useCallback((e) => {
    dispatch(
      productStyleActions.setProductStyle({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(productStyleActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateProductStyle>
      <FormHeader
        title="შექმენი პროდუქტის სტილი"
        linkCaption="ნახე პროდუქტის ყველა სტილი"
        redirectPath={PATHS.moderate_nested_routes.productStylesPage.relativePath()}
      />

      <Form>
        <InputText
          id="product-label-ka"
          label="პროდუქტის სტილის იარლიყი (ka)"
          name="label_ka"
          placeholder="სპორტული"
          error={error.label_ka.hasError}
          message={error.label_ka.message}
          value={label_ka}
          onChange={handleSetProductStyle}
        />

        <InputText
          id="product-label-en"
          label="პროდუქტის სტილის იარლიყი (en)"
          name="label_en"
          placeholder="sportswear"
          error={error.label_en.hasError}
          message={error.label_en.message}
          value={label_en}
          onChange={handleSetProductStyle}
        />

        <Button
          caption={isUpdating ? "განახლება" : "შექმნა"}
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createProductStyleQuery();
          }}
        />
      </Form>

      {status.loading && <LoadingSpinner />}
    </Styled.CreateProductStyle>
  );
}
