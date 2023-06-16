import { useRef, useState } from "react";
import {
  Form,
  InputText,
  Button,
  InputFile,
  InputFilterableSelect,
  InputTextarea,
} from "components/layouts";
import * as Styled from "./styles/CreateVariant.styled";

export default function CreateVariant() {
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  const variants = [
    "pocket",
    "zipper",
    "cuff",
    "bootstrap",
    "button",
    "collar",
    "wrist",
  ];

  return (
    <Styled.CreateVariant>
      <h4 className="moderator-title">შექმენი ვარიანტი</h4>
      <Form>
        <InputFilterableSelect
          id="variant-type"
          label="ვარიანტის ტიპი"
          message="მესიჯი"
          name="variantType"
          placeholder="pocket"
          anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
          list={variants}
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (ka)"
          message="მესიჯი"
          name="label_ka"
          placeholder="ჯიბის გარეშე"
        />

        <InputText
          id="variant-label"
          label="ვარიანტის იარლიყი (en)"
          message="მესიჯი"
          name="label_en"
          placeholder="without pocket"
        />

        <InputTextarea
          id="variant-description"
          label="ვარიანტის აღწერა"
          message="მესიჯი"
          name="description"
          placeholder="აღწერე ვარიანტი..."
        />

        <InputFile
          name="icon"
          fileRef={fileRef}
          file={file}
          onChange={(e) => setFile(e.target.files[0])}
          label="აირჩიეთ ნიშნულის ფაილი"
        />

        <Button caption="შექმნა" />
      </Form>
    </Styled.CreateVariant>
  );
}
