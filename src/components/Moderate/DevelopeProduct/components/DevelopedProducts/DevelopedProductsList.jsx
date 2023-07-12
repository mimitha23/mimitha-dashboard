import { useSelector } from "react-redux";
import { selectAllDevelopedProducts } from "store/selectors/moderate/developeProductSelectors";

import DevelopedProductCard from "./DevelopedProductCard";
import * as Styled from "./styles/DevelopedProductsList.styled";

export default function DevelopedProductsList({ onDelete, onEdit }) {
  const allDevelopedProducts = useSelector(selectAllDevelopedProducts);

  return (
    <Styled.DevelopedProductsList>
      <ul className="developed-products__list">
        {allDevelopedProducts.map((product) => (
          <DevelopedProductCard
            key={product._id}
            product={product}
            onDelete={() => onDelete(product._id)}
            onEdit={() => onEdit(product)}
          />
        ))}
      </ul>
    </Styled.DevelopedProductsList>
  );
}
