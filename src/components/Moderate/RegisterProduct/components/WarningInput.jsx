import { InputText } from "components/layouts/Form";

export default function WarningInput({ id, name, value, onChange, caption }) {
  return (
    <div className="warning-fields--box__field">
      <label htmlFor="warning_ka">{caption}:</label>
      <InputText
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
