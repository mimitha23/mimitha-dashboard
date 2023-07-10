import { memo } from "react";
import * as Styled from "./Form.styled";

export default memo(function InputTextarea({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  message,
  error = false,
  onChange = () => {},
  anotation,
}) {
  return (
    <Styled.InputTextarea className="form__input-text form__input--textarea">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        type={type}
        name={name}
        className={`form__input-textarea ${error ? "error" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />

      {anotation && (
        <blockquote className="form__input-anotation">{anotation}</blockquote>
      )}

      {error && <p className="form__input-error--message">{message}</p>}
    </Styled.InputTextarea>
  );
});
