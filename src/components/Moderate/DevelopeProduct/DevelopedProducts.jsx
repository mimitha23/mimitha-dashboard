import DevelopedProductsHeader from "./components/DevelopedProductsHeader";
import DevelopedProductsList from "./components/DevelopedProductsList";
import * as Styled from "./styles/DevelopedProducts.styled";

export default function DevelopedProducts({ children }) {
  return (
    <Styled.DevelopedProducts>
      <DevelopedProductsHeader />

      <div className="developed-products__container">
        <DevelopedProductsList />
        <aside className="developed-products__aside">{children}</aside>
      </div>
    </Styled.DevelopedProducts>
  );
}
