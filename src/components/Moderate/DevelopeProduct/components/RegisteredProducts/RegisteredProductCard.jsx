import { Link } from "react-router-dom";

import { PATHS } from "config/routes";

import CardDetailBlock from "./CardDetailBlock";
import { EditAndDeleteButtons } from "components/layouts";
import * as Styled from "./RegisteredProductCard.styled";

export default function RegisteredProductCard({ product, onEdit, onDelete }) {
  return (
    <Styled.RegisteredProductCard>
      <Link
        to={PATHS.moderate_nested_routes.developedProductsPage.relativePath({
          registeredProductId: product._id,
        })}
      >
        <EditAndDeleteButtons
          onEdit={() => onEdit()}
          onDelete={() => onDelete()}
          isAbsolute={true}
        />

        <figure className="registered-product--card__fig">
          <img src={product.thumbnail} alt={product.thumbnail} loading="lazy" />
        </figure>

        <div className="registered-product--card__details">
          <CardDetailBlock
            label="რედაქტირებადი"
            value={product.isEditable ? "კი" : "არა"}
          />

          <CardDetailBlock
            label="პროდუქტის ტიპი"
            value={product.productType.ka}
          />

          <CardDetailBlock
            label="სტილი"
            value={product.styles.map((style) => style.ka).join(" / ")}
          />

          <CardDetailBlock
            label="სეზონი"
            value={product.seasons.map((season) => season.ka).join(" / ")}
          />

          <CardDetailBlock label="სქესი" value={product.gender.ka} />

          <CardDetailBlock
            label="მიმაგრებული პროდუქტები"
            value={product.attachedProducts}
          />
        </div>
      </Link>
    </Styled.RegisteredProductCard>
  );
}
