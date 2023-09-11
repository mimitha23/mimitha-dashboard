import { PATHS } from "config/routes";
import { Controller } from "react-hook-form";
import { useTextureMutationQuery } from "hooks/api/moderate";

import * as Layouts from "components/layouts";
import * as Styled from "./styles/CreateTexture.styled";

export default function CreateTexture() {
  const { form, isUpdating, onSubmit, status } = useTextureMutationQuery();

  return (
    <Styled.CreateTexture>
      <Layouts.FormHeader
        title="შექმენი ტექსტურა"
        linkCaption="ნახე ყველა ტექსტურა"
        redirectPath={PATHS.moderate_nested_routes.texturesPage.relativePath()}
      />

      <Layouts.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="label_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputText
              id="texture-label--ka"
              label="ტექსტურა (ka)"
              placeholder="ბამბა"
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="label_en"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputText
              id="texture-label--en"
              label="ტექსტურა (en)"
              placeholder="cotton"
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Layouts.Button
          type="submit"
          disabled={status.loading}
          caption={isUpdating ? "განახლება" : "შექმნა"}
        />
      </Layouts.Form>

      <Layouts.ErrorModal status={status} />

      {status.loading && <Layouts.LoadingSpinner />}
    </Styled.CreateTexture>
  );
}
