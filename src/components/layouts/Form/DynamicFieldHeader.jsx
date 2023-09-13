import AddFieldButton from "./AddFieldButton";
import * as Styled from "./styles/Form.styled";

export default function DynamicFieldHeader({ label, onAddField }) {
  return (
    <Styled.DynamicFieldHeader>
      <label>{label}</label>
      <AddFieldButton onAddField={onAddField} />
    </Styled.DynamicFieldHeader>
  );
}
