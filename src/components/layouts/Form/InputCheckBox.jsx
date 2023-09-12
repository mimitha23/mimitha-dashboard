import * as Styled from "./styles/Form.styled";

export default function InputCheckBox({
  id,
  label,
  error,
  checked,
  message,
  fieldProps,
}) {
  return (
    <Styled.InputCheckbox className="check__box">
      <div className="checkbox__field">
        <input id={id} type="checkbox" {...fieldProps} checked={checked} />
        <label htmlFor={id}>{label}</label>
      </div>

      {error && <p>{message}</p>}
    </Styled.InputCheckbox>
  );
}
