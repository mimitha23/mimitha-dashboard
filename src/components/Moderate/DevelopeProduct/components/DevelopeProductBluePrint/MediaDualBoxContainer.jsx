import * as Styled from "./DevelopedProductBlueprint.styled";

export default function MediaDualBoxContainer({ title, children }) {
  return (
    <Styled.MediaDualBoxContainer>
      <p className="product__media-box--title">{title}</p>

      <div className="product__thumbnails" data-dual-box-container>
        {children}
      </div>
    </Styled.MediaDualBoxContainer>
  );
}
