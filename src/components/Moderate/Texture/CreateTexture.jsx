/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectTextureForm,
  selectTextureStatus,
} from "store/selectors/moderateSelectors";
import { useCreateTextureQuery } from "hooks/api/moderate";
import { textureActions } from "store/reducers/moderate/textureReducer";

import { PATHS } from "config/routes";

import { Form, InputText, Button, LoadingSpinner } from "components/layouts";
import ModerateHeader from "../components/ModerateHeader";
import * as Styled from "./styles/CreateTexture.styled";

export default function CreateTexture() {
  const dispatch = useDispatch();
  const status = useSelector(selectTextureStatus);
  const { label_ka, label_en, isUpdating } = useSelector(selectTextureForm);

  const { createTextureQuery, error } = useCreateTextureQuery();

  const handleSetTexture = useCallback((e) => {
    dispatch(
      textureActions.setTexture({ key: e.target.name, value: e.target.value })
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(textureActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateTexture>
      <ModerateHeader
        title="შექმენი ტექსტურა"
        linkCaption="ნახე ყველა ტექსტურა"
        redirectPath={PATHS.moderate_nested_routes.texturesPage.relativePath()}
      />

      <Form>
        <InputText
          id="texture-label--ka"
          label="ტექსტურა (ka)"
          name="label_ka"
          placeholder="ბამბა"
          error={error.label_ka.hasError}
          message={error.label_ka.message}
          value={label_ka}
          onChange={handleSetTexture}
        />

        <InputText
          id="texture-label--en"
          label="ტექსტურა (en)"
          name="label_en"
          placeholder="cotton"
          error={error.label_en.hasError}
          message={error.label_en.message}
          value={label_en}
          onChange={handleSetTexture}
        />

        <Button
          caption={isUpdating ? "განახლება" : "შექმნა"}
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createTextureQuery();
          }}
        />
      </Form>

      {status.loading && <LoadingSpinner />}
    </Styled.CreateTexture>
  );
}
