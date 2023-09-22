import { useDevelopeProductGetQuery } from "hooks/api/moderate/developeProduct";

import * as Styled from "./CopyDevelopedProductConfig.styled";

export default function CopyDevelopedProductConfig() {
  const { getConfigCopyQuery, resetDevelopeProductFormState } =
    useDevelopeProductGetQuery();

  return (
    <Styled.CopyDevelopedProductConfig>
      <button
        className="copy-config__choose-btn"
        onClick={() => getConfigCopyQuery("createdAt")}
      >
        აიღე ბოლოს დამატებული პროდუქტის ასლი
      </button>
      <button
        className="copy-config__choose-btn"
        onClick={() => getConfigCopyQuery("updatedAt")}
      >
        აიღე ბოლოს რედაქტირებული პროდუქტის ასლი
      </button>
      <button
        className="copy-config__choose-btn reset"
        onClick={resetDevelopeProductFormState}
      >
        ანულირება
      </button>
    </Styled.CopyDevelopedProductConfig>
  );
}
