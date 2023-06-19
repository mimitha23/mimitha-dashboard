import { Link } from "react-router-dom";
import * as Styled from "./styles/RegisteredProductCard.styled";
import { PATHS } from "config/routes";

export default function RegisteredProductCard() {
  return (
    <Styled.RegisteredProductCard>
      <Link
        to={PATHS.moderate_nested_routes.developedProductsPage.relativePath({
          registeredProductId: "registerd-product-id",
        })}
      >
        <figure className="registered-product--card__fig">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <div className="registered-product--card__details">
          <div className="registered-product--card__details-box">
            <span>პროდუქტის ტიპი:</span>
            &nbsp;
            <span>ჰუდი</span>
          </div>
          <div className="registered-product--card__details-box">
            <span>სტილი:</span>
            &nbsp;
            <span>ყოველდღიური</span>
          </div>
          <div className="registered-product--card__details-box">
            <span>სეზონი:</span>
            &nbsp;
            <span>შემოდგომა</span>
          </div>
          <div className="registered-product--card__details-box">
            <span>რედაქტირებადი:</span>
            &nbsp;
            <span>კი</span>
          </div>
          <div className="registered-product--card__details-box">
            <span>მიმაგრებული პროდუქტები:</span>
            &nbsp;
            <span>20</span>
          </div>
          <div className="registered-product--card__details-box">
            <span>კომბინაციები:</span>
            &nbsp;
            <span>3</span>
          </div>
        </div>
      </Link>
    </Styled.RegisteredProductCard>
  );
}
