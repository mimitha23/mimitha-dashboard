import * as Styled from "./Form.styled";

export default function Button({ caption, onClick = () => {} }) {
  return <Styled.Button onClick={onClick}>{caption}</Styled.Button>;
}
