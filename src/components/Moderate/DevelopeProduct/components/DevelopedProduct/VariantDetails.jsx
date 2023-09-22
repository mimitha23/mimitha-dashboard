import { useState } from "react";

import { useVariantUtils } from "hooks/utils/moderate/variants";

import { EditAndDeleteButtons } from "components/layouts";
import ToggleDetailsHeader from "./ToggleDetailsHeader";
import * as Styled from "./styles/VariantDetails.styled";

export default function VariantDetails({ variants }) {
  const [showDetails, setShowDetails] = useState(false);

  const { onStartEdit } = useVariantUtils();

  return (
    <Styled.VariantDetails>
      <ToggleDetailsHeader
        label="ვარიანტები"
        isOpen={showDetails}
        onShowDetails={() => setShowDetails((prev) => !prev)}
      />

      {showDetails && (
        <ul className="variant-details__list">
          {variants.map((variant) => (
            <li key={variant._id} className="variant-details__list-item">
              <figure className="variant-details__list-item--fig">
                <svg>
                  <image xlinkHref={variant.icon} alt="" />
                </svg>
              </figure>
              <div className="variant-details__list-item--type">
                <span>ტიპი:</span>
                <span>{variant.type}</span>
              </div>
              <div className="variant-details__list-item--label">
                <span>იარლიყი:</span>
                <span>{variant.label_ka}</span>
              </div>
              <p className="variant-details__list-item--description">
                {variant.description_ka}
              </p>
              <EditAndDeleteButtons onEdit={() => onStartEdit(variant)} />
            </li>
          ))}
        </ul>
      )}
    </Styled.VariantDetails>
  );
}
