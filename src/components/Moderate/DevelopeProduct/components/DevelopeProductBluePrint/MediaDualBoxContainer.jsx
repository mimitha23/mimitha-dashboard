import * as Styled from "./DevelopedProductBlueprint.styled";

export default function MediaDualBoxContainer({ title, children }) {
  return (
    <Styled.MediaDualBox>
      <p className="product__media-box--title">{title}</p>

      <div className="product__thumbnails">{children}</div>
    </Styled.MediaDualBox>
  );
}
