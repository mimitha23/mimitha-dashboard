import { useProductStyleMutationQuery } from "hooks/api/moderate";

import { PATHS } from "config/routes";
import { Controller } from "react-hook-form";

import * as Layouts from "components/layouts";
import * as Form from "components/layouts/Form";
import * as Styled from "./styles/CreateProductStyle.styled";

export default function CreateProductStyle() {
  const { form, isUpdating, onSubmit, status } = useProductStyleMutationQuery();

  return (
    <Styled.CreateProductStyle>
      <Form.FormHeader
        title="შექმენი პროდუქტის სტილი"
        linkCaption="ნახე პროდუქტის ყველა სტილი"
        redirectPath={PATHS.moderate_nested_routes.productStylesPage.relativePath()}
      />

      <Form.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="label_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Form.InputText
              id="product-label-ka"
              label="პროდუქტის სტილის იარლიყი (ka)"
              placeholder="სპორტული"
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
            <Form.InputText
              id="product-label-en"
              label="პროდუქტის სტილის იარლიყი (en)"
              placeholder="sportswear"
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Form.Button
          type="submit"
          disabled={status.loading}
          caption={isUpdating ? "განახლება" : "შექმნა"}
        />
      </Form.Form>

      <Layouts.ErrorModal status={status} />

      {status.loading && <Layouts.LoadingSpinner />}
    </Styled.CreateProductStyle>
  );
}
