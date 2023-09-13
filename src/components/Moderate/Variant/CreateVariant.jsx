/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useVariantMutationQuery } from "hooks/api/moderate";
import { variantActions } from "store/reducers/moderate/variantReducer";
import * as variantSelectors from "store/selectors/moderate/variantSelectors";

import { PATHS } from "config/routes";
import { Controller } from "react-hook-form";

import * as Layouts from "components/layouts";
import * as Form from "components/layouts/Form";
import * as Styled from "./styles/CreateVariant.styled";

export default function CreateVariant() {
  const dispatch = useDispatch();

  const variants = useSelector(variantSelectors.selectExistingVariantTypes);

  const { form, onFileChange, onSelectVariant, onSubmit, isUpdating, status } =
    useVariantMutationQuery();

  useEffect(() => {
    dispatch(variantActions.getExistingVariantTypes());

    return () => {
      dispatch(variantActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateVariant>
      <Form.FormHeader
        title="შექმენი ვარიანტი"
        linkCaption="ნახე ყველა ვარიანტი"
        redirectPath={PATHS.moderate_nested_routes.variantsPage.relativePath()}
      />

      <Form.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="variant_type"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Form.InputFilterableSelect
              id="variant-type"
              label="ვარიანტის ტიპი"
              placeholder="pocket"
              anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
              strictSelection={false}
              list={variants}
              selectValue={(variant) => onSelectVariant(variant)}
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
          name="label_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Form.InputText
              id="variant-label"
              label="ვარიანტის იარლიყი (ka)"
              placeholder="ჯიბე"
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
              id="variant-label"
              label="ვარიანტის იარლიყი (en)"
              placeholder="pocket"
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="description_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Form.InputTextarea
              id="variant-description"
              label="ვარიანტის აღწერა (ka)"
              placeholder="აღწერე ვარიანტი..."
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="description_en"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Form.InputTextarea
              id="variant-description"
              label="ვარიანტის აღწერა (en)"
              placeholder="describe variant..."
              error={error ? true : false}
              message={error?.message}
              fieldProps={{ ...field }}
            />
          )}
        />

        <Controller
          name="new_icon"
          control={form.control}
          render={({ field: { value, ...field }, fieldState: { error } }) => (
            <Form.InputFile
              label="აირჩიეთ ნიშნულის ფაილი"
              accept="image/svg+xml"
              error={error ? true : false}
              message={error?.message}
              value={value || form.getValues().icon}
              fieldProps={{
                ...field,
                onChange: (e) => onFileChange(e, field.onChange),
              }}
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
    </Styled.CreateVariant>
  );
}
