/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectVariantForm,
  selectVariantStatus,
  selectExistingVariantTypes,
} from "store/selectors/moderate/variantSelectors";
import { useCreateVariantQuery } from "hooks/api/moderate";
import { variantActions } from "store/reducers/moderate/variantReducer";

import { PATHS } from "config/routes";

import {
  Form,
  InputText,
  Button,
  InputFile,
  InputFilterableSelect,
  InputTextarea,
  LoadingSpinner,
  FormHeader,
  ErrorModal,
} from "components/layouts";
import * as Styled from "./styles/CreateVariant.styled";

export default function CreateVariant() {
  const dispatch = useDispatch();

  const { createVariantQuery, error } = useCreateVariantQuery();

  const status = useSelector(selectVariantStatus);
  const variants = useSelector(selectExistingVariantTypes);
  const {
    variantType,
    label_ka,
    label_en,
    description_ka,
    description_en,
    icon,
    newIcon,
    isUpdating,
  } = useSelector(selectVariantForm);

  const handleSetVariant = useCallback((e) => {
    dispatch(
      variantActions.setVariant({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }, []);

  const fileRef = useRef();

  useEffect(() => {
    dispatch(variantActions.getExistingVariantTypes());

    return () => {
      dispatch(variantActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateVariant>
      <FormHeader
        title="შექმენი ვარიანტი"
        linkCaption="ნახე ყველა ვარიანტი"
        redirectPath={PATHS.moderate_nested_routes.variantsPage.relativePath()}
      />

      <Form>
        <InputFilterableSelect
          id="variant-type"
          label="ვარიანტის ტიპი"
          name="variantType"
          placeholder="pocket"
          anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
          strictSelection={false}
          message={error.variantType.itemErrors[0]?.message}
          error={error.variantType.hasError}
          list={variants}
          value={variantType?.caption || ""}
          setValue={({ value }) =>
            dispatch(variantActions.setVariantType(value))
          }
          selectValue={({ value }) =>
            dispatch(variantActions.selectVariantType(value))
          }
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (ka)"
          name="label_ka"
          placeholder="ჯიბე"
          value={label_ka}
          onChange={handleSetVariant}
          message={error.label_ka.message}
          error={error.label_ka.hasError}
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (en)"
          name="label_en"
          placeholder="pocket"
          value={label_en}
          onChange={handleSetVariant}
          message={error.label_en.message}
          error={error.label_en.hasError}
        />

        <InputTextarea
          id="variant-description"
          label="ვარიანტის აღწერა (ka)"
          name="description_ka"
          placeholder="აღწერე ვარიანტი..."
          value={description_ka}
          onChange={handleSetVariant}
          message={error.description_ka.message}
          error={error.description_ka.hasError}
        />

        <InputTextarea
          id="variant-description"
          label="ვარიანტის აღწერა (en)"
          name="description_en"
          placeholder="აღწერე ვარიანტი..."
          value={description_en}
          onChange={handleSetVariant}
          message={error.description_en.message}
          error={error.description_en.hasError}
        />

        <InputFile
          name="icon"
          label="აირჩიეთ ნიშნულის ფაილი"
          accept="image/svg+xml"
          fileRef={fileRef}
          file={newIcon || icon}
          message={
            error.icon?.hasError
              ? error.icon.message
              : error.newIcon?.hasError
              ? error.newIcon.message
              : ""
          }
          error={error.icon?.hasError || error.newIcon?.hasError}
          onChange={({ value }) => dispatch(variantActions.setIcon(value))}
        />

        <Button
          caption={isUpdating ? "განახლება" : "შექმნა"}
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createVariantQuery();
            fileRef.current.value = "";
          }}
        />
      </Form>

      <ErrorModal status={status} />

      {status.loading && <LoadingSpinner />}
    </Styled.CreateVariant>
  );
}
