import { Link } from "react-router-dom";
import * as Styled from "./styles/FormHeader.styled";

export default function FormHeader({ title, redirectPath, linkCaption }) {
  return (
    <Styled.FormHeader>
      <h4 className="moderate-header__title">{title}</h4>
      {linkCaption && (
        <Link to={redirectPath} className="moderate-header__link">
          {linkCaption}
        </Link>
      )}
    </Styled.FormHeader>
  );
}
