import { useTextureUtils } from "hooks/utils/moderate/textures";

import { EditAndDeleteButtons } from "components/layouts";
import * as Styled from "./TexturesList.styled";

export default function TexturesList({ filteredTextures, setActiveDeletion }) {
  const { onStartEdit } = useTextureUtils();

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
            onEdit={() => onStartEdit(texture)}
            onDelete={() => setActiveDeletion(texture._id)}
          />
        </div>
      ))}
    </Styled.TexturesList>
  );
}
