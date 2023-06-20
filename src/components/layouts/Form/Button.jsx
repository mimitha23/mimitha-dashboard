import * as Styled from "./Form.styled";

export default function Button({
  caption,
  onClick = () => {},
  disabled = false,
}) {
  return (
    <Styled.Button
      className="button-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {caption}
    </Styled.Button>
  );
}
