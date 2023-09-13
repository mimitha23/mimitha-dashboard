import { forwardRef } from "react";
import * as Styled from "./styles/Form.styled";

function InputText(
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
    <Styled.Input data-input>
      <div className="form__input-text--box">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          type={type}
          ref={ref}
          {...fieldProps}
          placeholder={placeholder}
          className={`form__input-field ${error ? "error" : ""}`}
        />
      </div>
      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.Input>
  );
}

export default forwardRef(InputText);
