import { useSelector } from "react-redux";

import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";
import { useRegisterProductQuery } from "hooks/api/moderate";

import { PATHS } from "config/routes";
import { Controller } from "react-hook-form";

import * as Layouts from "components/layouts";
import TextureField from "./components/TextureField";
import WarningField from "./components/WarningField";
import * as Styled from "./styles/RegisterProduct.styled";

export default function RegisterProduct() {
  const form = useRegisterProductQuery();

  const formDefaults = useSelector(
    registerProductSelectors.selectRegisterProductFormSuggestions
  );

  return (
    <Styled.RegisterProduct>
      <Layouts.FormHeader
        title="დაარეგისტრირე პროდუქტი"
        linkCaption="ნახე ყველა რეგისტრირებული პროდუქტი"
        redirectPath={
          PATHS.moderate_sidebar.registeredProductsPage.absolutePath
        }
      />

      <Layouts.Form onSubmit={form.form.handleSubmit(form.onSubmit)}>
        <Controller
          name="productTypes"
          control={form.form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
              id="product-type"
              label="პროდუქტის ტიპი"
              placeholder="აირჩიეთ პროდუქტის ტიპი"
              list={formDefaults.productTypes}
              selectValue={(productType) =>
                form.onSelect({ key: field.name, item: productType })
              }
              error={error ? true : false}
              message={error?.message}
              inputValue={field.value.caption}
              fieldProps={{
                ...field,
                onChange: (e) =>
                  field.onChange({
                    ...field.value,
                    caption: e.target.value,
                  }),
              }}
            />
          )}
        />

        <Controller
          name="productStyles"
          control={form.form.control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <Layouts.InputMultipleFilterableSelect
              id="style"
              label="სტილი"
              placeholder="აირჩიეთ სტილი"
              list={formDefaults.productStyles}
              error={error ? true : false}
              message={error?.message}
              fieldProps={field}
              selectedFields={value || []}
              selectField={(productType) =>
                form.onMultipleSelect({ key: field.name, item: productType })
              }
            />
          )}
        />

        <Controller
          name="seasons"
          control={form.form.control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <Layouts.InputMultipleFilterableSelect
              id="season"
              label="სეზონი"
              placeholder="აირჩიეთ სეზონი"
              list={formDefaults.seasons}
              selectedFields={value || []}
              error={error ? true : false}
              message={error?.message}
              fieldProps={field}
              selectField={(season) =>
                form.onMultipleSelect({ key: field.name, item: season })
              }
            />
          )}
        />

        <Controller
          name="gender"
          control={form.form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
              id="gender"
              label="გენდერი"
              placeholder="აირჩიეთ გენდერი"
              readOnly={true}
              list={formDefaults.gender}
              selectValue={(gender) =>
                form.onSelect({ key: field.name, item: gender })
              }
              error={error ? true : false}
              message={error?.message}
              inputValue={field.value.caption}
              fieldProps={{
                ...field,
                onChange: (e) =>
                  field.onChange({
                    ...field.value,
                    caption: e.target.value,
                  }),
              }}
            />
          )}
        />

        <Controller
          name="category"
          control={form.form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
              id="category"
              label="კატეგორია"
              placeholder="აირჩიეთ კატეგორია"
              readOnly={true}
              list={formDefaults.categories}
              selectValue={(gender) =>
                form.onSelect({ key: field.name, item: gender })
              }
              error={error ? true : false}
              message={error?.message}
              inputValue={field.value.caption}
              fieldProps={{
                ...field,
                onChange: (e) =>
                  field.onChange({
                    ...field.value,
                    caption: e.target.value,
                  }),
              }}
            />
          )}
        />

        <TextureField textureField={form.textureField} form={form.form} />

        <WarningField />

        <Controller
          name="isEditable"
          control={form.form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputCheckBox
              id="is-editable"
              label="არის რედაქტირებადი"
              error={error ? true : false}
              message={error?.message}
              checked={field.value}
              fieldProps={{
                ...field,
                onChange: (e) => field.onChange(e.target.checked),
              }}
            />
          )}
        />

        <Controller
          name="thumbnail"
          control={form.form.control}
          render={({ field: { value, ...field }, fieldState: { error } }) => (
            <Layouts.InputFile
              message={error?.message}
              error={error ? true : false}
              label="აირჩიეთ პროდუქტის მინიატურა"
              value={value || form.form.getValues().thumbnail}
              fieldProps={{
                ...field,
                onChange: (e) => form.onFileChange(e, field.onChange),
              }}
            />
          )}
        />

        <Layouts.Button
          type="submit"
          caption={form.isUpdating ? "განახლება" : "შექმნა"}
          disabled={form.status.loading}
        />
      </Layouts.Form>

      <Layouts.ErrorModal status={form.status} />

      {form.status.loading && <Layouts.LoadingSpinner />}
    </Styled.RegisterProduct>
  );
}
