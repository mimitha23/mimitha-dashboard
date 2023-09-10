/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCreateColorQuery } from "hooks/api/moderate";
import { colorActions } from "store/reducers/moderate/colorReducer";
import * as colorSelectors from "store/selectors/moderate/colorSelectors";

import { PATHS } from "config/routes";
import { isValidHexColor } from "functions";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createColorValidation } from "utils/zod/moderate";

import * as Layouts from "components/layouts";
import * as Styled from "./styles/CreateColor.styled";

export default function CreateColor() {
  const dispatch = useDispatch();

  const status = useSelector(colorSelectors.selectColorStatus);
  const { createColorQuery } = useCreateColorQuery();

  const { color_ka, color_en, color_hex, isUpdating } = useSelector(
    colorSelectors.selectColorForm
  );

  const form = useForm({
    resolver: zodResolver(createColorValidation),
    defaultValues: {
      color_ka: color_ka || "",
      color_en: color_en || "",
      color_hex: color_hex || "",
    },
  });

  const onSubmit = (values) => createColorQuery({ args: values, isUpdating });

  useEffect(() => {
    return () => {
      dispatch(colorActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateColor>
      <Layouts.FormHeader
        title="შექმენი ფერი"
        linkCaption="ნახე ყველა ფერი"
        redirectPath={PATHS.moderate_nested_routes.colorsPage.relativePath()}
      />

      <Layouts.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="color_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputText
              id="color-label--ka"
              label="ფერი (ka)"
              placeholder="მწვანე"
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="color_en"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputText
              id="color-label--en"
              label="ფერი (en)"
              placeholder="green"
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="color_hex"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Layouts.InputText
                id="color-hex"
                label="ფერი hex in decimal ფორმატში"
                placeholder="#26E066"
                error={error ? true : false}
                message={error?.message}
                fieldProps={{ ...field }}
              />

              {isValidHexColor(field.value) && (
                <div
                  className="picked-color"
                  style={{ background: field.value }}
                />
              )}
            </>
          )}
        />

        <Layouts.Button
          type="submit"
          disabled={status.loading}
          caption={isUpdating ? "განახლება" : "შექმნა"}
        />

        <Layouts.ErrorModal status={status} />

        {status.loading && <Layouts.LoadingSpinner />}
      </Layouts.Form>
    </Styled.CreateColor>
  );
}
