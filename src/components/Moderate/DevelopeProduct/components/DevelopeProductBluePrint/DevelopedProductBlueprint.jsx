import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectDevelopeProductForm,
  selectDevelopedProductAssets,
} from "store/selectors/moderate/developeProductSelectors";

import AssetsReview from "./AssetsReview";
import DetailsBlock from "./DetailsBlock";
import * as Styled from "./DevelopedProductBlueprint.styled";

export default function DevelopedProductBlueprint() {
  const form = useSelector(selectDevelopeProductForm);
  const assets = useSelector(selectDevelopedProductAssets);

  const [size, setSize] = useState({
    size: "",
    inStock: "",
  });

  useEffect(() => {
    if (!form.sizes[0]) return;

    const sizeStr = form.sizes
      .map((size) => (size.size.ka ? `${size.size.ka} - ${size.amount}` : ""))
      .join(" / ");

    const inStock = form.sizes.reduce(
      (acc, size) => acc + parseFloat(size.amount),
      0
    );

    setSize((prev) => ({
      ...prev,
      size: sizeStr,
      inStock,
    }));
  }, [form.sizes]);

  return (
    <Styled.DevelopedProductBlueprint>
      <AssetsReview assets={assets.assets} />

      <div className="registered-product--card__details">
        <DetailsBlock label="სათაური (ka)" value={form.title_ka} />

        <DetailsBlock label="სათაური (en)" value={form.title_en} />

        <DetailsBlock label="ფასი" value={form.price ? `${form.price}₾` : ""} />

        <DetailsBlock label="ფერი" value={form.color.ka} />

        <DetailsBlock label="ზომა" value={size.size} />

        <DetailsBlock label="ჯამური მარაგი" value={size.inStock} />

        <DetailsBlock label="ვარიანტები" value={form.variants?.length} />

        <DetailsBlock label="აღწერა (ka)" value={form.description_ka} />

        <DetailsBlock label="აღწერა (en)" value={form.description_en} />
      </div>
    </Styled.DevelopedProductBlueprint>
  );
}
