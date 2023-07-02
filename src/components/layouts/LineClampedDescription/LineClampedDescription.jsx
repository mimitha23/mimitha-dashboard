/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ClampedEl = styled.div`
  .clamped-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-height: normal;
  }
`;

export default function LineClampedDescription({ clamp = 2, text }) {
  const clampedElRef = useRef(null);

  const [exceedsClamp, setExceedsClamp] = useState(false);

  useEffect(() => {
    const clampedEl = clampedElRef.current;

    if (!clampedEl) return;

    const computedClampedEl = getComputedStyle(clampedEl);

    const clampedElHeight = parseFloat(computedClampedEl.height);
    const clampedElFontSize = parseFloat(computedClampedEl.fontSize);

    const numberOfLines = Math.round(
      clampedElHeight / (clampedElFontSize * 1.2)
    );

    if (numberOfLines > clamp) setExceedsClamp(true);
  }, []);

  return (
    <ClampedEl clamp={clamp}>
      <p
        className={exceedsClamp ? "clamped-description" : ""}
        ref={clampedElRef}
      >
        {text}
      </p>
      {exceedsClamp && <button>show all</button>}
    </ClampedEl>
  );
}
