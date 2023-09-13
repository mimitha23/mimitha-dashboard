import { MinusIcon } from "components/layouts/Icons";
import * as Styled from "./styles/Form.styled";

export default function RemoveFieldButton({ onRemove }) {
  return (
    <Styled.RemoveFieldButton
      className="texture-field__remove-btn"
      onClick={(e) => {
        e.preventDefault();
        onRemove();
      }}
    >
      <MinusIcon />
    </Styled.RemoveFieldButton>
  );
}
