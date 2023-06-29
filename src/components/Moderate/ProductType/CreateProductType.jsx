/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCreateProductType,
  selectCreateProductTypeStatus,
} from "store/selectors/moderateSelectors";
import { useCreateProductTypeQuery } from "hooks/api/moderate";
import { createProductTypeActions } from "store/reducers/moderate/createProductTypeReducer";

import { PATHS } from "config/routes";

import * as Styled from "./styles/CreateProductType.styled";
import ModerateHeader from "../components/ModerateHeader";
import { Form, InputText, Button, LoadingSpinner } from "components/layouts";

export default function CreateProductType() {
  const dispatch = useDispatch();
  const { label_ka, label_en, query } = useSelector(selectCreateProductType);
  const status = useSelector(selectCreateProductTypeStatus);

  const { createProductTypeQuery, error } = useCreateProductTypeQuery();

  const handleSetProductType = useCallback((e) => {
    dispatch(
      createProductTypeActions.setProductType({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(createProductTypeActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateProductType>
      <ModerateHeader
        title="შექმენი პროდუქტის ტიპი"
        linkCaption="ნახე პროდუქტის ყველა ტიპი"
        redirectPath={PATHS.moderate_nested_routes.productTypesPage.relativePath()}
      />

      <Form>
        <InputText
          id="product-label-ka"
          label="პროდუქტის ტიპის იარლიყი (ka)"
          name="label_ka"
          placeholder="კარგო შარვალი"
          error={error.label_ka.hasError}
          message={error.label_ka.message}
          value={label_ka}
          onChange={handleSetProductType}
        />

        <InputText
          id="product-label-en"
          label="პროდუქტის ტიპის იარლიყი (en)"
          name="label_en"
          placeholder="cargo trousers"
          error={error.label_en.hasError}
          message={error.label_en.message}
          value={label_en}
          onChange={handleSetProductType}
        />

        <InputText
          id="product-type"
          label="პროდუქტის ტიპის მონიშვნა"
          name="query"
          placeholder="cargo trousers"
          anotation="გამოყავით შორისით, შეიყვანეთ ლათინური ასოებით"
          error={error.query.hasError}
          message={error.query.message}
          value={query}
          onChange={handleSetProductType}
        />

        <Button
          caption="შექმნა"
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createProductTypeQuery();
          }}
        />
      </Form>

      {status.loading && <LoadingSpinner />}
    </Styled.CreateProductType>
  );
}
