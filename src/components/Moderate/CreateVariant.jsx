/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import {
  selectCreateVariant,
  selectCreateVariantStatus,
} from "store/selectors/moderateSelectors";
import { useCreateVariantQuery } from "hooks/api/moderate";
import { createVariantActions } from "store/reducers/moderate/createVariantReducer";

import {
  Form,
  InputText,
  Button,
  InputFile,
  InputFilterableSelect,
  InputTextarea,
  LoadingSpinner,
} from "components/layouts";
import * as Styled from "./styles/CreateVariant.styled";

const variants = [
  { _id: nanoid(), caption: "pocket" },
  { _id: nanoid(), caption: "zipper" },
  { _id: nanoid(), caption: "cuff" },
  { _id: nanoid(), caption: "bootstrap" },
  { _id: nanoid(), caption: "button" },
  { _id: nanoid(), caption: "collar" },
  { _id: nanoid(), caption: "wrist" },
];

export default function CreateVariant() {
  const dispatch = useDispatch();
  const { createVariantQuery, error } = useCreateVariantQuery();
  const { variantType, label_ka, label_en, description, icon } =
    useSelector(selectCreateVariant);
  const status = useSelector(selectCreateVariantStatus);

  const handleSetVariant = useCallback((e) => {
    dispatch(
      createVariantActions.setVariant({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }, []);

  const handleManualSetVariant = useCallback(({ key, value }) => {
    dispatch(createVariantActions.setVariant({ key, value }));
  }, []);

  const fileRef = useRef();

  useEffect(() => {
    return () => {
      dispatch(createVariantActions.resetState());
    };
  }, []);

  return (
    <Styled.CreateVariant>
      <h4 className="moderator-title">შექმენი ვარიანტი</h4>
      <Form>
        <InputFilterableSelect
          id="variant-type"
          label="ვარიანტის ტიპი"
          name="variantType"
          placeholder="pocket"
          anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
          value={variantType}
          setValue={handleManualSetVariant}
          message={error.variantType.message}
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
          fileRef={fileRef}
          file={icon}
          message={error.icon.message}
          error={error.icon.hasError}
          onChange={handleManualSetVariant}
        />

        <Button
          caption="შექმნა"
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createVariantQuery();
          }}
        />
      </Form>

      {status.loading && <LoadingSpinner />}
    </Styled.CreateVariant>
  );
}
