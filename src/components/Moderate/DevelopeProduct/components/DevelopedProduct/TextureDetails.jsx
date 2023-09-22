import { useState } from "react";

import { useTextureUtils } from "hooks/utils/moderate/textures";

import { EditAndDeleteButtons } from "components/layouts";
import ToggleDetailsHeader from "./ToggleDetailsHeader";
import * as Styled from "./styles/TextureDetails.styled";

export default function TextureDetails({ textures }) {
  const [showDetails, setShowDetails] = useState(false);

  const { onStartEdit } = useTextureUtils();

  return (
    <Styled.TextureDetails>
      <ToggleDetailsHeader
        label="ტექსტურა"
        isOpen={showDetails}
        onShowDetails={() => setShowDetails((prev) => !prev)}
      />

      {showDetails && (
        <ul className="texture-details__list">
          {textures.map((texture) => (
            <li key={texture._id} className="texture-details__list-item">
              <div className="texture-details__list-item--texture">
                <span>ტექსტურა:</span>
                <span>{texture.ka}</span>
              </div>
              <div className="texture-details__list-item--percentage">
                <span>პროცენტულობა:</span>
                <span>{texture.percentage}%</span>
              </div>
              <EditAndDeleteButtons onEdit={() => onStartEdit(texture)} />
            </li>
          ))}
        </ul>
      )}
    </Styled.TextureDetails>
  );
}
