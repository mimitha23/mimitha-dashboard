import { Filter } from "components/layouts";
import RegisteredProductCard from "./components/RegisteredProductCard";
import * as Styled from "./styles/RegisteredProductsList.styled";

export default function RegisteredProductsList() {
  return (
    <Styled.RegisteredProductsList>
      <div className="registered-products__filter-box">
        <Filter />
      </div>
      <span>რეგისტრირებული პროდუქტები</span>
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
    </Styled.RegisteredProductsList>
  );
}
