import { Link } from "react-router-dom";
import { PlusIcon } from "components/layouts/Icons";
import * as Styled from "./styles/DevelopedProductsHeader.styledd";
import { PATHS } from "config/routes";

export default function DevelopedProductsHeader() {
  return (
    <Styled.DevelopedProductsHeader>
      <span className="developed-products--list__title">
        მიმაგრებული პროდუქტები
      </span>
      <Link
        to={PATHS.moderate_nested_routes.addDevelopedProductPage.relativePath}
        className="add-developed--product__btn"
      >
        <span className="add-developed--product__btn-icon">
          <PlusIcon />
        </span>
        <span>მიამაგრე პროდუქტი</span>
      </Link>
    </Styled.DevelopedProductsHeader>
  );
}
