import { memo } from "react";
import { CloseXIcon } from "../Icons";
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
  multiple = false,
  onRemoveFile,
}) {
  return (
    <Styled.Input className="form__input-text form__input-file" data-input-file>
      {((Array.isArray(file) && file[0]) || (!Array.isArray(file) && file)) && (
        <div className="form__file-icon--review" data-input-file-review>
          {multiple ? (
            file.map((f, index) => (
              <figure
                className="form__file-icon--review__fig multiple"
                key={`file-${index}`}
              >
                <img
                  src={f instanceof Object ? URL.createObjectURL(f) : f}
                  alt=""
                />

                <button
                  className="multiple-file__close-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveFile && onRemoveFile(f);
                  }}
                >
                  <CloseXIcon />
                </button>
              </figure>
            ))
          ) : (
            <figure className="form__file-icon--review__fig">
              <img
                src={file instanceof Object ? URL.createObjectURL(file) : file}
                alt=""
              />
            </figure>
          )}
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
          onChange({
            key: e.target.name,
            value: multiple ? e.target.files : e.target.files[0],
          })
        }
        accept={accept}
        multiple={multiple}
        hidden
      />

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.Input>
  );
});
