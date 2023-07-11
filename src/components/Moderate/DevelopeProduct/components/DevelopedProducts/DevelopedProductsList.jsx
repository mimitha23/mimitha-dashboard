import { useSelector } from "react-redux";
import { selectAllDevelopedProducts } from "store/selectors/moderate/developeProductSelectors";

import DevelopedProductCard from "./DevelopedProductCard";
import * as Styled from "./styles/DevelopedProductsList.styled";

export default function DevelopedProductsList() {
  const allDevelopedProducts = useSelector(selectAllDevelopedProducts);

  return (
    <Styled.DevelopedProductsList>
      <ul className="developed-products__list">
        {allDevelopedProducts.map((product) => (
          <DevelopedProductCard key={product._id} product={product} />
        ))}
      </ul>
    </Styled.DevelopedProductsList>
  );
}
