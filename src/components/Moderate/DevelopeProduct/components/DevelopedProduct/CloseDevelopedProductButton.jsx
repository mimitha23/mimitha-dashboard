import { useNavigate } from "react-router-dom";

import { CloseXIcon } from "components/layouts/Icons";

export default function CloseDevelopedProductButton() {
  const navigate = useNavigate();

  return (
    <div className="developed-product__header">
      <button
        onClick={() => navigate(-1)}
        className="developed-product__header-close--btn"
      >
        <CloseXIcon />
      </button>
    </div>
  );
}
