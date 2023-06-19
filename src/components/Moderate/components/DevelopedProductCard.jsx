import { Link } from "react-router-dom";
import * as Styled from "./styles/DevelopedProductCard.styled";

export default function DevelopedProductCard() {
  return (
    <Styled.DevelopedProductCard>
      <Link to="developed-product/developed-product-id">
        <figure className="developed-product--card__fig">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>

        <div className="developed-product--card__details">
          <div className="developed-product--card__details-box">
            <span>სახელი:</span>
            &nbsp;
            <span>ჰუდი</span>
          </div>
          <div className="developed-product--card__details-box">
            <span>ფასი:</span>
            &nbsp;
            <span>30₾</span>
          </div>
          <div className="developed-product--card__details-box">
            <span>რეიტინგი:</span>
            &nbsp;
            <span>4.5</span>
          </div>
          <div className="developed-product--card__details-box">
            <span>გაყიდულია:</span>
            &nbsp;
            <span>116</span>
          </div>
          <div className="developed-product--card__details-box">
            <span>ფერი:</span>
            &nbsp;
            <span>ლურჯი</span>
          </div>
          <div className="developed-product--card__details-box">
            <span>მარაგშია:</span>
            &nbsp;
            <span>3</span>
          </div>
        </div>
      </Link>
    </Styled.DevelopedProductCard>
  );
}
