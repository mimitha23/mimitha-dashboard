import * as Styled from "./styles/Form.styled";

export default function Button({
  caption,
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <Styled.Button
      className="button-primary"
      {...(onClick ? { onClick } : "")}
      disabled={disabled}
      type={type}
    >
      {caption}
    </Styled.Button>
  );
}
