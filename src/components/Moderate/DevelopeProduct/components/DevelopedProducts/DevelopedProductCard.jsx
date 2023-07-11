import { Link } from "react-router-dom";

import { EditAndDeleteButtons } from "components/layouts";
import ProductCardDetailBlock from "./ProductCardDetailBlock";
import * as Styled from "./styles/DevelopedProductCard.styled";

export default function DevelopedProductCard({ product }) {
  return (
    <Styled.DevelopedProductCard>
      <Link to={`developed-product/${product._id}`}>
        <EditAndDeleteButtons
          onEdit={() => {}}
          onDelete={() => {}}
          isAbsolute={true}
        />

        <figure className="developed-product--card__fig">
          <img src={product.assets[0]} alt={product.title.en} loading="lazy" />
        </figure>

        <div className="developed-product--card__details">
          <ProductCardDetailBlock label="სახელი" value={product.title.ka} />

          <ProductCardDetailBlock label="ფასი" value={`${product.price}₾`} />

          <ProductCardDetailBlock label="რეიტინგი" value={product.rating} />

          <ProductCardDetailBlock label="გაყიდულია" value={product.soldOut} />

          <ProductCardDetailBlock label="ფერი" value={product.color.ka} />

          <ProductCardDetailBlock label="მარაგშია" value={product.inStock} />
        </div>
      </Link>
    </Styled.DevelopedProductCard>
  );
}
