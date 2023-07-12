import * as Styled from "./styles/ToggleDetailsHeader.styled";

export default function ToggleDetailsHeader({ label, onShowDetails, isOpen }) {
  return (
    <Styled.ToggleDetailsHeader>
      <span>{label}:</span>
      <button className="show-details__btn" onClick={onShowDetails}>
        {isOpen ? "დამალე" : "ნახე"} {label}
      </button>
    </Styled.ToggleDetailsHeader>
  );
}
