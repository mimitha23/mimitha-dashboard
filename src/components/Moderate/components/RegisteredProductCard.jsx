import { Link } from "react-router-dom";
import * as Styled from "./styles/RegisteredProductCard.styled";
import { MODERATE_HIDDEN_ROUTES } from "config/routes";

export default function RegisteredProductCard() {
  const { path, productParam } =
    MODERATE_HIDDEN_ROUTES.developedProductsListPage;

  return (
    <Styled.RegisteredProductCard>
      <Link to={path.replace(productParam, "product-id")}>
        <figure className="registered-product__fig">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <div className="registered-product__details">
          <div className="registered-product__details-box">
            <span>პროდუქტის ტიპი:</span>
            &nbsp;
            <span>ჰუდი</span>
          </div>
          <div className="registered-product__details-box">
            <span>სტილი:</span>
            &nbsp;
            <span>ყოველდღიური</span>
          </div>
          <div className="registered-product__details-box">
            <span>სეზონი:</span>
            &nbsp;
            <span>შემოდგომა</span>
          </div>
          <div className="registered-product__details-box">
            <span>რედაქტირებადი:</span>
            &nbsp;
            <span>კი</span>
          </div>
          <div className="registered-product__details-box">
            <span>მიმაგრებული პროდუქტები:</span>
            &nbsp;
            <span>20</span>
          </div>
          <div className="registered-product__details-box">
            <span>კომბინაციები:</span>
            &nbsp;
            <span>3</span>
          </div>
        </div>
      </Link>
    </Styled.RegisteredProductCard>
  );
}
