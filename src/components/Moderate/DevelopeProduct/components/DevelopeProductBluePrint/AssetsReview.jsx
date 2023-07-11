import { memo } from "react";
import { nanoid } from "@reduxjs/toolkit";

export default memo(function AssetsReview({ assets }) {
  return (
    <div className="add-developed--product__assets-box">
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
  );
});
