import * as Styled from "./styles/Multimedia.styled";

export default function MultimediaBox({ type, src }) {
  return (
    <Styled.MultimediaBox>
      {type === "image" ? (
        <img src={src} alt="multimedia" />
      ) : type === "video" ? (
        <video src={src} autoPlay={true} controls={true} alt="multimedia" />
      ) : (
        <></>
      )}
    </Styled.MultimediaBox>
  );
}
