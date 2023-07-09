import { useSelector } from "react-redux";

import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";

import * as Styled from "./styles/AddDevelopedProductBlueprint.styled";

export default function AddDevelopedProductBlueprint() {
  const form = useSelector(selectDevelopeProductForm);

  return (
    <Styled.AddDevelopedProductBlueprint>
      <div className="add-developed--product__assets-box">
        <figure className="add-developed--product__assets-item">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <figure className="add-developed--product__assets-item">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <figure className="add-developed--product__assets-item">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <figure className="add-developed--product__assets-item">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <figure className="add-developed--product__assets-item">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
        <figure className="add-developed--product__assets-item">
          <img
            src="https://www.bfgcdn.com/1500_1500_90/017-2701-0511/patagonia-fitz-roy-icon-uprisal-hoody-hoodie.jpg"
            alt=""
          />
        </figure>
      </div>

      <div className="registered-product--card__details">
        <div className="registered-product--card__details-box">
          <span>სათაური (ka):</span>
          &nbsp;
          <span>
            {form.title_ka || (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>სათაური (en):</span>
          &nbsp;
          <span>
            {form.title_en || (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>ფასი:</span>
          &nbsp;
          <span>
            {form.price ? (
              `${form.price}₾`
            ) : (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>ფერი:</span>
          &nbsp;
          <span>
            {form.color.ka || (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>ზომა:</span>
          &nbsp;
          <span>
            {form.sizes[0].size.ka ? (
              form.sizes
                .map((size) =>
                  size.size.ka ? `${size.size.ka} - ${size.amount}` : ""
                )
                .join(" / ")
            ) : (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>ჯამური მარაგი:</span>
          &nbsp;
          <span>
            {form.sizes.reduce(
              (acc, size) => acc + parseFloat(size.amount),
              0
            ) || <span className="is-empty-part">არ არის შევსებული</span>}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>ვარიანტები:</span>
          &nbsp;
          <span>
            {form.variants?.length || (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>აღწერა (ka):</span>
          &nbsp;
          <span>
            {form.description_ka || (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>

        <div className="registered-product--card__details-box">
          <span>აღწერა (en):</span>
          &nbsp;
          <span>
            {form.description_en || (
              <span className="is-empty-part">არ არის შევსებული</span>
            )}
          </span>
        </div>
      </div>
    </Styled.AddDevelopedProductBlueprint>
  );
}
