import * as Styled from "./CopyDevelopedProductConfig.styled";

export default function CopyDevelopedProductConfig() {
  return (
    <Styled.CopyDevelopedProductConfig>
      <button className="copy-config__choose-btn">
        აიღე ბოლოს დამატებული პროდუქტის ასლი
      </button>
      <button className="copy-config__choose-btn">
        აიღე ბოლოს რედაქტირებული პროდუქტის ასლი
      </button>
    </Styled.CopyDevelopedProductConfig>
  );
}
