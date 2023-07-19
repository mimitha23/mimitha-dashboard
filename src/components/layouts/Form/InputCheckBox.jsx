import * as Styled from "./Form.styled";

export default function InputCheckBox({
  label,
  id,
  name,
  checked,
  onChange,
  error,
}) {
  return (
    <Styled.InputCheckbox className="check__box">
      <div className="checkbox__field">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>

      {error.hasError && <p>{error.message}</p>}
    </Styled.InputCheckbox>
  );
}
