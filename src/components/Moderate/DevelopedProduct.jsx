import * as Styled from "./styles/DevelopedProduct.styled";
import { CloseXIcon, EditIcon } from "components/layouts/Icons";
import { useNavigate } from "react-router-dom";

export default function DevelopedProduct() {
  const navigate = useNavigate();

  return (
    <Styled.DevelopedProduct>
      <div className="developed-product__header">
        <button
          onClick={() => navigate(-1)}
          className="developed-product__header-close--btn"
        >
          <CloseXIcon />
        </button>
      </div>
      <main className="developed-product__main">
        <figure className="developed-product__fig">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>

        <div className="developed-product__details">
          <div className="developed-product__details-box">
            <button>
              <EditIcon />
            </button>
            <span>სახელი:</span>
            <span>ჰუდი</span>
          </div>

          <div className="developed-product__details-box">
            <button>
              <EditIcon />
            </button>
            <span>ფასი:</span>
            <span>30₾</span>
          </div>

          <div className="developed-product__details-box">
            <span></span>
            <span>რეიტინგი:</span>
            <span>4.5</span>
          </div>

          <div className="developed-product__details-box">
            <span></span>
            <span>გაყიდულია:</span>
            <span>116</span>
          </div>

          <div className="developed-product__details-box">
            <span></span>
            <span>ფერი:</span>
            <span>ლურჯი</span>
          </div>

          <div className="developed-product__details-box">
            <span></span>
            <span>მარაგშია:</span>
            <span>3</span>
          </div>
        </div>
      </main>
    </Styled.DevelopedProduct>
  );
}
