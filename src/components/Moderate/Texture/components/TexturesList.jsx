import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { textureActions } from "store/reducers/moderate/textureReducer";
import { PATHS } from "config/routes";

import { EditAndDeleteButtons } from "components/layouts";
import * as Styled from "./TexturesList.styled";

export default function TexturesList({ filteredTextures, setActiveDeletion }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onEdit(texture) {
    dispatch(textureActions.setTextureDefaults(texture));
    navigate(PATHS.moderate_sidebar.createTexturePage.absolutePath);
  }

  return (
    <Styled.TexturesList>
      {filteredTextures.map((texture) => (
        <div className="all-textures--list__item-details" key={texture._id}>
          <div className="all-textures--list__item-details__label">
            <p>
              <span>ka:</span>
              &nbsp;
              <span>{texture.ka}</span>
            </p>

            <p>
              <span>en:</span>
              &nbsp;
              <span>{texture.en}</span>
            </p>
          </div>

          <EditAndDeleteButtons
            onEdit={() => onEdit(texture)}
            onDelete={() => setActiveDeletion(texture._id)}
          />
        </div>
      ))}
    </Styled.TexturesList>
  );
}
