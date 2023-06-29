import { Filter } from "components/layouts";
import RegisteredProductCard from "./components/RegisteredProductCard";
import * as Styled from "./styles/RegisteredProductsList.styled";

export default function RegisteredProducts() {
  return (
    <Styled.RegisteredProducts>
      <span className="registered-products--list__title">
        რეგისტრირებული პროდუქტები
      </span>
      <div className="registered-products__filter-box">
        <Filter />
      </div>
      <div className="registered-products__list">
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
        <RegisteredProductCard />
      </div>
    </Styled.RegisteredProducts>
  );
}
