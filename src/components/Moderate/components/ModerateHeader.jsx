import * as Styled from "./styles/ModerateHeader.styled";
import { Link } from "react-router-dom";

export default function ModerateHeader({ title, redirectPath, linkCaption }) {
  return (
    <Styled.ModerateHeader>
      <h4 className="moderate-header__title">{title}</h4>
      {linkCaption && (
        <Link to={redirectPath} className="moderate-header__link">
          {linkCaption}
        </Link>
      )}
    </Styled.ModerateHeader>
  );
}
