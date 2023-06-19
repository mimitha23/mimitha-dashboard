import * as Styled from "./Form.styled";

export default function Button({ caption, onClick = () => {} }) {
  return (
    <Styled.Button className="button-primary" onClick={onClick}>
      {caption}
    </Styled.Button>
  );
}
