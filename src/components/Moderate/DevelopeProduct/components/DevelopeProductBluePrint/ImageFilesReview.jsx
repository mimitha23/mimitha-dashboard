import { memo } from "react";
import { Controller } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";

import { useDevelopeProductProvider } from "providers/DevelopeProductFormProvider";

import { PlusIcon, CloseXIcon } from "components/layouts/Icons";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default memo(function ImageFilesReview() {
  const { form, onAssetsChange, onRemoveAsset } = useDevelopeProductProvider();

  return (
    <Styled.ImageFilesReview>
      <p className="product__media-box--title">პროდუქტის ფოტო მასალა</p>

      <div className="images-review__list">
        <Controller
          name="new_assets"
          control={form.control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <>
              {value[0] &&
                value.map((asset) => (
                  <ImageFrame
                    key={nanoid()}
                    asset={asset}
                    onRemoveAsset={onRemoveAsset}
                  />
                ))}

              <label
                className={`product__media-box__label ${
                  value[0] ? "" : "empty"
                }`}
                htmlFor="product__media-box__input"
              >
                <PlusIcon />
                <span>ატვირთე პროდუქტის ფოტო-მასალა</span>
                <input
                  hidden
                  id="product__media-box__input"
                  type="file"
                  multiple
                  accept="image/*"
                  {...field}
                  onChange={(e) => onAssetsChange(e, onChange)}
                />
              </label>
            </>
          )}
        />
      </div>
    </Styled.ImageFilesReview>
  );
});

function ImageFrame({ asset, onRemoveAsset }) {
  return (
    <figure className="add-developed--product__assets-item">
      <img
        src={asset instanceof Blob ? URL.createObjectURL(asset) : asset}
        alt=""
      />

      <button
        className="remove-asset__btn"
        onClick={(e) => {
          e.preventDefault();
          onRemoveAsset(asset);
        }}
      >
        <CloseXIcon />
      </button>
    </figure>
  );
}
