import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";
import { variantActions } from "store/reducers/moderate/variantReducer";

import { EditAndDeleteButtons } from "components/layouts";
import ToggleDetailsHeader from "./ToggleDetailsHeader";
import * as Styled from "./styles/VariantDetails.styled";

export default function VariantDetails({ variants }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);

  function onEdit(variant) {
    dispatch(variantActions.setVariantDefaults(variant));
    navigate(PATHS.moderate_sidebar.createVariantPage.absolutePath);
  }

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
                <span>{variant.ka}</span>
              </div>
              <p className="variant-details__list-item--description">
                {variant.description}
              </p>
              <EditAndDeleteButtons onEdit={() => onEdit(variant)} />
            </li>
          ))}
        </ul>
      )}
    </Styled.VariantDetails>
  );
}
