/* eslint-disable react-hooks/exhaustive-deps */
import { useColorMutationQuery } from "hooks/api/moderate";

import { PATHS } from "config/routes";
import { isValidHexColor } from "functions";

import { Controller } from "react-hook-form";

import * as Layouts from "components/layouts";
import * as Styled from "./styles/CreateColor.styled";

export default function CreateColor() {
  const { form, isUpdating, onSubmit, status } = useColorMutationQuery();

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
