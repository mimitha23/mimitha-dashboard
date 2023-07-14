import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import * as Styled from "./CopyDevelopedProductConfig.styled";

export default function CopyDevelopedProductConfig() {
  const dispatch = useDispatch();

  const { registeredProductId } = useParams();

  function getConfigCopy(key) {
    dispatch(
      developeProductActions.copyDevelopedProductConfig({
        registeredProductId,
        params: `${key}=-1`,
      })
    );
  }

  function resetForm() {
    dispatch(developeProductActions.resetFormState());
  }

  return (
    <Styled.CopyDevelopedProductConfig>
      <button
        className="copy-config__choose-btn"
        onClick={() => getConfigCopy("createdAt")}
      >
        აიღე ბოლოს დამატებული პროდუქტის ასლი
      </button>
      <button
        className="copy-config__choose-btn"
        onClick={() => getConfigCopy("updatedAt")}
      >
        აიღე ბოლოს რედაქტირებული პროდუქტის ასლი
      </button>
      <button className="copy-config__choose-btn reset" onClick={resetForm}>
        ანულირება
      </button>
    </Styled.CopyDevelopedProductConfig>
  );
}
