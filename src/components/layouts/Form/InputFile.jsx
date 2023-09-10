import { forwardRef } from "react";
import { CloseXIcon } from "../Icons";
import * as Styled from "./Form.styled";

function InputFile(
  {
    label,
    anotation,
    error = false,
    message,
    multiple = false,
    accept = "image/*",
    fieldProps,
    value,
    onRemoveFile,
  },
  ref
) {
  return (
    <Styled.Input className="form__input-text form__input-file" data-input-file>
      {((Array.isArray(value) && value[0]) ||
        (!Array.isArray(value) && value)) && (
        <div className="form__file-icon--review" data-input-file-review>
          {multiple ? (
            value.map((f, index) => (
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
                src={value instanceof File ? URL.createObjectURL(value) : value}
                alt="media"
              />
            </figure>
          )}
        </div>
      )}

      <label htmlFor="form-file--upload" className="form__input-file--label">
        {label ? label : "აირჩიეთ ფაილი"}
      </label>

      <input
        hidden
        type="file"
        ref={ref}
        accept={accept}
        multiple={multiple}
        id="form-file--upload"
        {...fieldProps}
        // name={name}
        // onChange={(e) =>
        //   onChange({
        //     key: e.target.name,
        //     value: multiple ? e.target.files : e.target.files[0],
        //   })
        // }
      />

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.Input>
  );
}

export default forwardRef(InputFile);
