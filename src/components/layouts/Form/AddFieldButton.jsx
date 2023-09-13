import { PlusIcon } from "components/layouts/Icons";
import * as Styled from "./styles/Form.styled";

export default function AddFieldButton({ onAddField }) {
  return (
    <Styled.AddFieldButton
      className="add-texture--field__btn"
      onClick={(e) => {
        e.preventDefault();
        onAddField();
      }}
    >
      <span>დაამატე ველი</span>
      <span>
        <PlusIcon />
      </span>
    </Styled.AddFieldButton>
  );
}
