import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATHS } from "config/routes";
import { textureActions } from "store/reducers/moderate/textureReducer";

import { EditAndDeleteButtons } from "components/layouts";
import ToggleDetailsHeader from "./ToggleDetailsHeader";
import * as Styled from "./styles/TextureDetails.styled";

export default function TextureDetails({ textures }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);

  function onEdit(texture) {
    dispatch(textureActions.setTextureDefaults(texture));
    navigate(PATHS.moderate_sidebar.createTexturePage.absolutePath);
  }

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
              <EditAndDeleteButtons onEdit={() => onEdit(texture)} />
            </li>
          ))}
        </ul>
      )}
    </Styled.TextureDetails>
  );
}
