import { memo } from "react";
import { nanoid } from "@reduxjs/toolkit";
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
          <p className="no-files--message">ფაილები არ არის ატვირთული</p>
        )}
      </div>
    </Styled.ImageFilesReview>
  );
});
