import { useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "components/layouts/Icons";
import * as Styled from "./styles/DevelopedProductSlider.styled";

export default function DevelopedProductSlider({ assets }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  function handleSlider(direction) {
    const maxImageIndex = assets.length - 1;

    if (direction === "LEFT") {
      setActiveImageIndex((prev) => (prev === 0 ? maxImageIndex : prev - 1));
    } else if (direction === "RIGHT") {
      setActiveImageIndex((prev) => (prev === maxImageIndex ? 0 : prev + 1));
    }
  }

  return (
    <Styled.DevelopedProductSlider>
      <figure className="developed-product__fig">
        <img
          src={assets?.[activeImageIndex]}
          alt={assets?.[activeImageIndex]}
        />

        <div className="developed-product__slider-btn--box">
          <button onClick={() => handleSlider("LEFT")}>
            <ArrowLeftIcon />
          </button>
          <button onClick={() => handleSlider("RIGHT")}>
            <ArrowRightIcon />
          </button>
        </div>
      </figure>
    </Styled.DevelopedProductSlider>
  );
}
