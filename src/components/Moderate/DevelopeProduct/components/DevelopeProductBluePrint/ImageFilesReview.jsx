import { memo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { PlusIcon } from "components/layouts/Icons";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default memo(function ImageFilesReview({ assets }) {
  return (
    <Styled.ImageFilesReview>
      <p className="product__media-box--title">პროდუქტის ფოტო მასალა</p>

      <div className="images-review__list">
        {assets[0] &&
          assets.map((asset) => (
            <figure
              className="add-developed--product__assets-item"
              key={nanoid()}
            >
              <img
                src={asset instanceof Blob ? URL.createObjectURL(asset) : asset}
                alt=""
              />
            </figure>
          ))}

        {!assets[0] && (
          <label
            className="product__media-box__label"
            htmlFor="product__media-box__input"
          >
            <PlusIcon />
            <span>ატვირთე პროდუქტის ფოტო-მასალა</span>
            <input hidden id="product__media-box__input" type="file" />
          </label>
        )}
      </div>
    </Styled.ImageFilesReview>
  );
});
