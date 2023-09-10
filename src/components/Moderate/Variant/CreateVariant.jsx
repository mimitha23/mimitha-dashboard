/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCreateVariantQuery } from "hooks/api/moderate";
import { variantActions } from "store/reducers/moderate/variantReducer";
import * as variantSelectors from "store/selectors/moderate/variantSelectors";

import { PATHS } from "config/routes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVariantValidation } from "utils/zod/moderate";

import * as Layouts from "components/layouts";
import * as Styled from "./styles/CreateVariant.styled";

export default function CreateVariant() {
  const dispatch = useDispatch();

  const { createVariantQuery, error } = useCreateVariantQuery();

  const {
    variantType,
    label_ka,
    label_en,
    description_ka,
    description_en,
    icon,
    newIcon,
    isUpdating,
  } = useSelector(variantSelectors.selectVariantForm);
  const status = useSelector(variantSelectors.selectVariantStatus);
  const variants = useSelector(variantSelectors.selectExistingVariantTypes);

  const form = useForm({
    resolver: zodResolver(createVariantValidation),
    defaultValues: {
      variantType: {
        _id: "",
        caption: "",
        label_ka: "",
        label_en: "",
      },
      label_ka: "",
      label_en: "",
      description_ka: "",
      description_en: "",
      icon: "",
      new_icon: "",
    },
  });

  function onFileChange(reactEvent, fieldChangeEvent) {
    const file = reactEvent.target.files[0];

    const isImageFile =
      file && file instanceof File && file.type.includes("image");

    if (!isImageFile) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async (e) => {
      const imageBase64 = e.currentTarget.result.toString() || "";
      fieldChangeEvent(imageBase64);
    };
  }

  function onSelectVariant(variant) {
    console.log(variant);
  }

  const onSubmit = (values) => console.log(values);

  useEffect(() => {
    dispatch(variantActions.getExistingVariantTypes());

    return () => {
      dispatch(variantActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateVariant>
      <Layouts.FormHeader
        title="შექმენი ვარიანტი"
        linkCaption="ნახე ყველა ვარიანტი"
        redirectPath={PATHS.moderate_nested_routes.variantsPage.relativePath()}
      />

      <Layouts.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="variantType"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
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

        {/* <Layouts.InputFilterableSelect
          id="variant-type"
          label="ვარიანტის ტიპი"
          placeholder="pocket"
          anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
          strictSelection={false}
          list={variants}
          selectValue={({ value }) =>
            dispatch(variantActions.selectVariantType(value))
          }
          name="variantType"
          message={error.variantType.itemErrors[0]?.message}
          error={error.variantType.hasError}
          value={variantType?.caption || ""}
          setValue={({ value }) =>
            dispatch(variantActions.setVariantType(value))
          }
        /> */}

        <Controller
          name="label_ka"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputText
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
            <Layouts.InputText
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
            <Layouts.InputTextarea
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
            <Layouts.InputTextarea
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
            <Layouts.InputFile
              label="აირჩიეთ ნიშნულის ფაილი"
              accept="image/svg+xml"
              error={error ? true : false}
              message={error?.message}
              value={value}
              fieldProps={{
                ...field,
                onChange: (e) => onFileChange(e, field.onChange),
              }}
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
    </Styled.CreateVariant>
  );
}
