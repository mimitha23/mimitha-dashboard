import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

import { PATHS } from "config/routes";
import { useDevelopeProductProvider } from "providers/DevelopeProductFormProvider";
import * as developeProductSelectors from "store/selectors/moderate/developeProductSelectors";

import * as UI from "./components";
import * as Layouts from "components/layouts";
import * as Form from "components/layouts/Form";
import * as Styled from "./styles/AddDevelopedProduct.styled";

export default function AddDevelopedProduct() {
  const { colors, sizes, variants } = useSelector(
    developeProductSelectors.selectDevelopeProductFormSuggestions
  );

  const form = useDevelopeProductProvider();

  return (
    <Styled.AddDevelopedProduct>
      <Form.FormHeader
        title="განავითარე პროდუქტი"
        linkCaption="ნახე ყველა მიმაგრებული პროდუქტი"
        redirectPath={PATHS.moderate_nested_routes.developedProductsPage.absolutePath(
          { registeredProductId: form.registeredProductId }
        )}
      />

      <div className="add-developed--product__content">
        <div className="add-developed--product__form-wrapper">
          {!form.isUpdating && <UI.CopyDevelopedProductConfig />}

          <Form.Form onSubmit={form.form.handleSubmit(form.onSubmit)}>
            <Controller
              name="title_ka"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputText
                  id="product-title_ka"
                  label="პროდუქტის სათაური (ka)"
                  placeholder="შავი ჰუდი ჯიბით"
                  message={error?.message}
                  fieldProps={{ ...field }}
                  error={error ? true : false}
                />
              )}
            />

            <Controller
              name="title_en"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputText
                  id="product-title_en"
                  label="პროდუქტის სათაური (en)"
                  placeholder="black hoody with pocket"
                  message={error?.message}
                  fieldProps={{ ...field }}
                  error={error ? true : false}
                />
              )}
            />

            <Controller
              name="price"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputText
                  type="number"
                  placeholder="30"
                  id="product-price"
                  label="პროდუქტის ფასი"
                  message={error?.message}
                  error={error ? true : false}
                  fieldProps={{
                    ...field,
                    onChange: (e) => field.onChange(+e.target.value),
                  }}
                />
              )}
            />

            <Controller
              name="color"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputFilterableSelect
                  id="color"
                  label="ფერი"
                  placeholder="ლურჯი"
                  list={colors}
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
                  selectValue={(productType) =>
                    form.onSelect({ key: field.name, item: productType })
                  }
                />
              )}
            />

            <UI.SizeField
              sizeField={form.sizeField}
              form={form.form}
              sizeSuggestions={sizes}
            />

            <Controller
              name="variants"
              control={form.form.control}
              render={({
                field: { onChange, value, ...field },
                fieldState: { error },
              }) => (
                <Form.InputMultipleFilterableSelect
                  id="variants"
                  label="ვარიანტი"
                  placeholder="დაამატე ვარიანტი"
                  list={variants}
                  error={error ? true : false}
                  message={error?.message}
                  fieldProps={field}
                  selectedFields={value || []}
                  selectField={(productType) =>
                    form.onMultipleSelect({
                      key: field.name,
                      item: productType,
                    })
                  }
                />
              )}
            />

            <Controller
              name="description_ka"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputTextarea
                  id="product-description--ka"
                  label="პროდუქტის აღწერა (ka)"
                  placeholder="აღწერე პროდუქტი..."
                  message={error?.message}
                  fieldProps={{ ...field }}
                  error={error ? true : false}
                />
              )}
            />

            <Controller
              name="description_en"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputTextarea
                  id="product-description--en"
                  label="პროდუქტის აღწერა (en)"
                  placeholder="describe product..."
                  message={error?.message}
                  fieldProps={{ ...field }}
                  error={error ? true : false}
                />
              )}
            />

            <Controller
              name="is_public"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputCheckBox
                  id="is-public"
                  label="არის საჯარო"
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
              name="is_featured"
              control={form.form.control}
              render={({ field, fieldState: { error } }) => (
                <Form.InputCheckBox
                  id="is-featured"
                  label="არის პოპულარული"
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

            <Form.Button
              type="submit"
              disabled={form.status.loading}
              caption={form.isUpdating ? "განახლება" : "შექმნა"}
            />
          </Form.Form>
        </div>

        <UI.DevelopedProductBlueprint />
      </div>

      <Layouts.ErrorModal status={form.status} />

      {form.status.loading && <Layouts.LoadingSpinner />}
    </Styled.AddDevelopedProduct>
  );
}
