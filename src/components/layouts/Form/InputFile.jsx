import { memo } from "react";
import * as Styled from "./Form.styled";

export default memo(function InputFile({
  name,
  label,
  onChange = () => {},
  error = false,
  message,
  fileRef,
  file,
  anotation,
  accept = "image/*",
}) {
  return (
    <Styled.Input className="form__input-text form__input-file">
      {file && (
        <div className="form__file-icon--review">
          <figure className="form__file-icon--review__fig">
            <img
              src={file instanceof Object ? URL.createObjectURL(file) : file}
              alt=""
            />
          </figure>
        </div>
      )}

      <label htmlFor="form-file--upload" className="form__input-file--label">
        {label ? label : "აირჩიეთ ფაილი"}
      </label>

      <input
        ref={fileRef}
        id="form-file--upload"
        type="file"
        name={name}
        onChange={(e) =>
          onChange({ key: e.target.name, value: e.target.files[0] })
        }
        accept={accept}
        multiple={false}
        hidden
      />

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.Input>
  );
});
