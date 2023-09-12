import { forwardRef } from "react";
import * as Styled from "./styles/Form.styled";

function InputTextarea(
  {
    id,
    label,
    type = "text",
    placeholder,
    error = false,
    message,
    anotation,
    fieldProps,
  },
  ref
) {
  return (
    <Styled.InputTextarea className="form__input-text form__input--textarea">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        type={type}
        ref={ref}
        {...fieldProps}
        placeholder={placeholder}
        className={`form__input-textarea ${error ? "error" : ""}`}
      />

      {anotation && (
        <blockquote className="form__input-anotation">{anotation}</blockquote>
      )}

      {error && <p className="form__input-error--message">{message}</p>}
    </Styled.InputTextarea>
  );
}

export default forwardRef(InputTextarea);
