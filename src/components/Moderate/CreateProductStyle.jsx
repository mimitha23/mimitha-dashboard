/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCreateProductStyle,
  selectCreateProductStyleStatus,
} from "store/selectors/moderateSelectors";
import { useCreateProductStyleQuery } from "hooks/api/moderate";
import { createProductStyleActions } from "store/reducers/moderate/createProductStyleReducer";

import { Form, InputText, Button, LoadingSpinner } from "components/layouts";
import * as Styled from "./styles/CreateProductStyle.styled";

export default function CreateProductStyle() {
  const dispatch = useDispatch();
  const status = useSelector(selectCreateProductStyleStatus);
  const { label_ka, label_en, query } = useSelector(selectCreateProductStyle);

  const { createProductStyleQuery, error } = useCreateProductStyleQuery();

  const handleSetProductStyle = useCallback((e) => {
    dispatch(
      createProductStyleActions.setProductStyle({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(createProductStyleActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateProductStyle>
      <h4 className="moderator-title">შექმენი პროდუქტის სტილი</h4>
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

        <InputText
          id="product-type"
          label="პროდუქტის სტილის მონიშვნა"
          name="query"
          placeholder="sportswear"
          anotation="გამოყავით შორისით, შეიყვანეთ ლათინური ასოებით"
          error={error.query.hasError}
          message={error.query.message}
          value={query}
          onChange={handleSetProductStyle}
        />

        <Button
          caption="შექმნა"
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
