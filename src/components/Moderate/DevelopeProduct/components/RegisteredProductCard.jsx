import { Link } from "react-router-dom";

import { PATHS } from "config/routes";

import { EditIcon, DeleteIcon } from "components/layouts/Icons";
import * as Styled from "./styles/RegisteredProductCard.styled";

export default function RegisteredProductCard({ product, onEdit, onDelete }) {
  return (
    <Styled.RegisteredProductCard>
      <Link
        to={PATHS.moderate_nested_routes.developedProductsPage.relativePath({
          registeredProductId: product._id,
        })}
      >
        <div className="proregistered-product--card__actions">
          <button
            className="proregistered-product--card__actions-btn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEdit();
            }}
          >
            <EditIcon />
          </button>
          <button
            className="proregistered-product--card__actions-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
          >
            <DeleteIcon />
          </button>
        </div>

        <figure className="registered-product--card__fig">
          <img src={product.thumbnail} alt={product.thumbnail} loading="lazy" />
        </figure>

        <div className="registered-product--card__details">
          <div className="registered-product--card__details-box">
            <span>პროდუქტის ტიპი:</span>
            &nbsp;
            <span>{product.productType.ka}</span>
          </div>

          <div className="registered-product--card__details-box">
            <span>სტილი:</span>
            &nbsp;
            <span>{product.styles.map((style) => style.ka).join(" / ")}</span>
          </div>

          <div className="registered-product--card__details-box">
            <span>სეზონი:</span>
            &nbsp;
            <span>
              {product.seasons.map((season) => season.ka).join(" / ")}
            </span>
          </div>

          <div className="registered-product--card__details-box">
            <span>რედაქტირებადი:</span>
            &nbsp;
            <span>{product.isEditable ? "კი" : "არა"}</span>
          </div>

          <div className="registered-product--card__details-box">
            <span>მიმაგრებული პროდუქტები:</span>
            &nbsp;
            <span>{product.attachedProducts}</span>
          </div>

          {/* <div className="registered-product--card__details-box">
            <span>კომბინაციები:</span>
            &nbsp;
            <span>3</span>
          </div> */}
        </div>
      </Link>
    </Styled.RegisteredProductCard>
  );
}
