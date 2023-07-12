import { useState } from "react";

import ToggleDetailsHeader from "./ToggleDetailsHeader";
import * as Styled from "./styles/WarningDetails.styled";

export default function WarningDetails({ warnings }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Styled.WarningDetails>
      <ToggleDetailsHeader
        label="გაფრთხილებები"
        isOpen={showDetails}
        onShowDetails={() => setShowDetails((prev) => !prev)}
      />

      {showDetails && (
        <ul className="warning-details__list">
          {warnings.map((warning) => (
            <li key={warning._id} className="warning-details__list-item">
              {warning.ka}
            </li>
          ))}
        </ul>
      )}
    </Styled.WarningDetails>
  );
}
