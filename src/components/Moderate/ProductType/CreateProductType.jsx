/* eslint-disable react-hooks/exhaustive-deps */
import { PATHS } from "config/routes";
import { Controller } from "react-hook-form";
import { useProductTypeMutationQuery } from "hooks/api/moderate";

import * as Layouts from "components/layouts";
import * as Styled from "./styles/CreateProductType.styled";

export default function CreateProductType() {
  const { form, isUpdating, onSubmit, status } = useProductTypeMutationQuery();

  return (
    <Styled.CreateProductType>
      <Layouts.FormHeader
        title="შექმენი პროდუქტის ტიპი"
        linkCaption="ნახე პროდუქტის ყველა ტიპი"
        redirectPath={PATHS.moderate_nested_routes.productTypesPage.relativePath()}
      />

      <Layouts.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="label_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputText
              id="product-label-ka"
              label="პროდუქტის ტიპის იარლიყი (ka)"
              placeholder="კარგო შარვალი"
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
              id="product-label-en"
              label="პროდუქტის ტიპის იარლიყი (en)"
              placeholder="cargo trousers"
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
    </Styled.CreateProductType>
  );
}
