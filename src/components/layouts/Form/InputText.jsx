import * as Styled from "./Form.styled";

export default function InputText({
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
    <Styled.Input data-input>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        className="form__input-field"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />

      {anotation && <blockquote>{anotation}</blockquote>}
      {error && <p>{message}</p>}
    </Styled.Input>
  );
}