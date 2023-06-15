import * as Styled from "./Form.styled";

export default function InputTextarea({
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
    <Styled.InputTextarea className="form__input-text">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        type={type}
        name={name}
        className="form__input-textarea"
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
}
