/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectVariantForm,
  selectVariantStatus,
  selectExistingVariantTypes,
} from "store/selectors/moderateSelectors";
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
} from "components/layouts";
import ModerateHeader from "../components/ModerateHeader";
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
    description,
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

  const handleManualSetVariant = useCallback(({ key, value, strict }) => {
    dispatch(variantActions.setVariant({ key, value, strict }));
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
      <ModerateHeader
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
          value={variantType?.caption || ""}
          setValue={handleManualSetVariant}
          message={error.variantType.itemErrors[0]?.message}
          error={error.variantType.hasError}
          list={variants}
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (ka)"
          name="label_ka"
          placeholder="ჯიბის გარეშე"
          value={label_ka}
          onChange={handleSetVariant}
          message={error.label_ka.message}
          error={error.label_ka.hasError}
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (en)"
          name="label_en"
          placeholder="without pocket"
          value={label_en}
          onChange={handleSetVariant}
          message={error.label_en.message}
          error={error.label_en.hasError}
        />

        <InputTextarea
          id="variant-description"
          label="ვარიანტის აღწერა"
          name="description"
          placeholder="აღწერე ვარიანტი..."
          value={description}
          onChange={handleSetVariant}
          message={error.description.message}
          error={error.description.hasError}
        />

        <InputFile
          name="icon"
          label="აირჩიეთ ნიშნულის ფაილი"
          accept="image/svg+xml"
          fileRef={fileRef}
          file={newIcon || icon}
          message={error.icon.message}
          error={error.icon.hasError}
          onChange={handleManualSetVariant}
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

      {status.loading && <LoadingSpinner />}
    </Styled.CreateVariant>
  );
}
