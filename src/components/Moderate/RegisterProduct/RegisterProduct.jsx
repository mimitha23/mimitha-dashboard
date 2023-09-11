/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as registerProductSelectors from "store/selectors/moderate/registerProductSelectors";
import { useRegisterProductQuery } from "hooks/api/moderate";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { PATHS } from "config/routes";
import { Controller } from "react-hook-form";

import * as Layouts from "components/layouts";
import TextureField from "./components/TextureField";
import WarningField from "./components/WarningField";
import * as Styled from "./styles/RegisterProduct.styled";

export default function RegisterProduct() {
  const dispatch = useDispatch();

  const { form, onSelect, onFileChange, onSubmit, status } =
    useRegisterProductQuery();

  const {
    gender,
    productTypes: selectedTypes,
    seasons: selectedSeasons,
    productStyles: selectedStyles,
    isEditable,
    thumbnail,
    newThumbnail,
    isUpdating,
    category,
  } = useSelector(registerProductSelectors.selectRegisterProductForm);
  const {
    gender: genders,
    productStyles,
    productTypes,
    seasons,
    categories,
  } = useSelector(
    registerProductSelectors.selectRegisterProductFormSuggestions
  );

  const setMultipleSelectable = useCallback(({ key, value }) => {
    dispatch(registerProductActions.setMultipleSelectable({ key, value }));
  }, []);

  useEffect(() => {
    dispatch(registerProductActions.getRegisterProductFormSuggestions());

    return () => {
      dispatch(registerProductActions.resetState());
    };
  }, []);

  return (
    <Styled.RegisterProduct>
      <Layouts.FormHeader
        title="დაარეგისტრირე პროდუქტი"
        linkCaption="ნახე ყველა რეგისტრირებული პროდუქტი"
        redirectPath={
          PATHS.moderate_sidebar.registeredProductsPage.absolutePath
        }
      />

      <Layouts.Form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="productTypes"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
              id="product-type"
              label="პროდუქტის ტიპი"
              placeholder="აირჩიეთ პროდუქტის ტიპი"
              list={productTypes}
              selectValue={(productType) =>
                onSelect({ key: field.name, item: productType })
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

        {/* <Layouts.InputMultipleFilterableSelect
          id="style"
          label="სტილი"
          name="productStyles"
          placeholder="აირჩიეთ სტილი"
          error={error.productStyles.hasError}
          message={error.productStyles.message}
          selectedFields={selectedStyles}
          selectField={setMultipleSelectable}
          list={productStyles}
        />

        <Layouts.InputMultipleFilterableSelect
          id="season"
          label="სეზონი"
          name="seasons"
          placeholder="აირჩიეთ სეზონი"
          error={error.seasons.hasError}
          message={error.seasons.message}
          selectedFields={selectedSeasons}
          selectField={setMultipleSelectable}
          list={seasons}
        /> */}

        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
              id="gender"
              label="გენდერი"
              placeholder="აირჩიეთ გენდერი"
              readOnly={true}
              list={genders}
              selectValue={(gender) =>
                onSelect({ key: field.name, item: gender })
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
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <Layouts.InputFilterableSelect
              id="category"
              label="კატეგორია"
              placeholder="აირჩიეთ კატეგორია"
              readOnly={true}
              list={categories}
              selectValue={(gender) =>
                onSelect({ key: field.name, item: gender })
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

        {/* <TextureField error={error.textures} /> */}

        {/* <WarningField error={error.warnings} /> */}

        <Controller
          name="isEditable"
          control={form.control}
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
          control={form.control}
          render={({ field: { value, ...field }, fieldState: { error } }) => (
            <Layouts.InputFile
              message={error?.message}
              error={error ? true : false}
              label="აირჩიეთ პროდუქტის მინიატურა"
              value={value || form.getValues().thumbnail}
              fieldProps={{
                ...field,
                onChange: (e) => onFileChange(e, field.onChange),
              }}
            />
          )}
        />

        <Layouts.Button
          type="submit"
          caption={isUpdating ? "განახლება" : "შექმნა"}
          disabled={status.loading}
        />
      </Layouts.Form>

      <Layouts.ErrorModal status={status} />

      {status.loading && <Layouts.LoadingSpinner />}
    </Styled.RegisterProduct>
  );
}
