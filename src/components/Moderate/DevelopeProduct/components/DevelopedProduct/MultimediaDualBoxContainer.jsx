import * as Styled from "./styles/Multimedia.styled";

export default function MultimediaDualBoxContainer({ children, title }) {
  return (
    <Styled.MultimediaDualBoxContainer>
      <p className="multimedia-title">{title}</p>
      <div className="multimedia-content">{children}</div>
    </Styled.MultimediaDualBoxContainer>
  );
}
