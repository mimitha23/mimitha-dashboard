/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import {
  setVariant,
  resetState,
} from "store/reducers/moderate/createVariantReducer";
import { selectCreateVariant } from "store/selectors/moderateSelectors";
import { useCreateVariantQuery } from "hooks/api/moderate";

import {
  Form,
  InputText,
  Button,
  InputFile,
  InputFilterableSelect,
  InputTextarea,
  Loading,
} from "components/layouts";
import * as Styled from "./styles/CreateVariant.styled";

const variants = [
  { variantType: "pocket", _id: nanoid() },
  { variantType: "zipper", _id: nanoid() },
  { variantType: "cuff", _id: nanoid() },
  { variantType: "bootstrap", _id: nanoid() },
  { variantType: "button", _id: nanoid() },
  { variantType: "collar", _id: nanoid() },
  { variantType: "wrist", _id: nanoid() },
];

export default function CreateVariant() {
  const dispatch = useDispatch();
  const { createVariantQuery } = useCreateVariantQuery();

  const { variantType, label_ka, label_en, description, status } =
    useSelector(selectCreateVariant);

  const fileRef = useRef();
  const [file, setFile] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(resetState());
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
          value={variantType}
          setValue={({ key, value }) => dispatch(setVariant({ key, value }))}
          message="მესიჯი"
          error={false}
          anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
          list={variants}
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (ka)"
          name="label_ka"
          placeholder="ჯიბის გარეშე"
          value={label_ka}
          onChange={(e) =>
            dispatch(setVariant({ key: e.target.name, value: e.target.value }))
          }
          message="მესიჯი"
          error={false}
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (en)"
          name="label_en"
          placeholder="without pocket"
          value={label_en}
          onChange={(e) =>
            dispatch(setVariant({ key: e.target.name, value: e.target.value }))
          }
          message="მესიჯი"
          error={false}
        />

        <InputTextarea
          id="variant-description"
          label="ვარიანტის აღწერა"
          name="description"
          placeholder="აღწერე ვარიანტი..."
          value={description}
          onChange={(e) =>
            dispatch(setVariant({ key: e.target.name, value: e.target.value }))
          }
          message="მესიჯი"
          error={false}
        />

        <InputFile
          name="icon"
          fileRef={fileRef}
          file={file}
          onChange={(e) => setFile(e.target.files[0])}
          label="აირჩიეთ ნიშნულის ფაილი"
        />

        <Button
          caption="შექმნა"
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            createVariantQuery();
          }}
        />

        {status.loading && <Loading />}
      </Form>
    </Styled.CreateVariant>
  );
}
