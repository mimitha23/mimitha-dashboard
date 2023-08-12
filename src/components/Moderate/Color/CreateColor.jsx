/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectColorForm,
  selectColorStatus,
} from "store/selectors/moderate/colorSelectors";
import { useCreateColorQuery } from "hooks/api/moderate";
import { colorActions } from "store/reducers/moderate/colorReducer";

import { PATHS } from "config/routes";
import { isValidHexColor } from "functions";

import {
  Form,
  InputText,
  Button,
  LoadingSpinner,
  FormHeader,
  ErrorModal,
} from "components/layouts";
import * as Styled from "./styles/CreateColor.styled";

export default function CreateColor() {
  const dispatch = useDispatch();
  const { createColorQuery, error } = useCreateColorQuery();
  const { color_ka, color_en, color_hex, isUpdating } =
    useSelector(selectColorForm);
  const status = useSelector(selectColorStatus);

  const handleSetColor = useCallback((e) => {
    dispatch(
      colorActions.setColor({ key: e.target.name, value: e.target.value })
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(colorActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateColor colorinhex={color_hex}>
      <FormHeader
        title="შექმენი ფერი"
        linkCaption="ნახე ყველა ფერი"
        redirectPath={PATHS.moderate_nested_routes.colorsPage.relativePath()}
      />

      <Form>
        <InputText
          id="color-label--ka"
          label="ფერი (ka)"
          name="color_ka"
          placeholder="მწვანე"
          error={error.color_ka.hasError}
          message={error.color_ka.message}
          value={color_ka}
          onChange={handleSetColor}
        />

        <InputText
          id="color-label--en"
          label="ფერი (en)"
          name="color_en"
          placeholder="green"
          error={error.color_en.hasError}
          message={error.color_en.message}
          value={color_en}
          onChange={handleSetColor}
        />

        <InputText
          id="color-hex"
          label="ფერი hex in decimal ფორმატში"
          name="color_hex"
          placeholder="#26E066"
          error={error.color_hex.hasError}
          message={error.color_hex.message}
          value={color_hex}
          onChange={handleSetColor}
        />

        {isValidHexColor(color_hex) && <div className="picked-color"></div>}

        <Button
          caption={isUpdating ? "განახლება" : "შექმნა"}
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createColorQuery();
          }}
        />

        <ErrorModal status={status} />

        {status.loading && <LoadingSpinner />}
      </Form>
    </Styled.CreateColor>
  );
}
