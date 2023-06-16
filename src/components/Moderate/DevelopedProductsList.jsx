import { Link } from "react-router-dom";
import * as Styled from "./styles/DevelopedProductsList.styled";

export default function DevelopedProductsList() {
  return (
    <Styled.DevelopedProductsList>
      <div className="developed-products--list__head">
        <span>მიმაგრებული პროდუქტები</span>
        <button>+ მიამაგრე პროდუქტი</button>
      </div>
      <div>
        <ul>
          <li>
            <Link to="developed-product/developed-product-id">card</Link>
          </li>
        </ul>
      </div>
    </Styled.DevelopedProductsList>
  );
}
