import { useColorUtils } from "hooks/utils/moderate/colors";

import * as Styled from "./ColorsList.styled";
import { EditAndDeleteButtons } from "components/layouts";

export default function ColorsList({ filteredColors, setActiveDeletion }) {
  const { onStartEdit } = useColorUtils();

  return (
    <Styled.ColorsList>
      {filteredColors.map((color) => (
        <Styled.ColorsListItem key={color._id} hex={color.hex}>
          <span className="all-colors--list__item-pattern"></span>
          <div className="all-colors--list__item-details">
            <div className="all-colors--list__item-details__label">
              <p>
                <span>ka:</span>
                &nbsp;
                <span>{color.ka}</span>
              </p>

              <p>
                <span>en:</span>
                &nbsp;
                <span>{color.en}</span>
              </p>
            </div>

            <EditAndDeleteButtons
              onEdit={() => onStartEdit(color)}
              onDelete={() => setActiveDeletion(color._id)}
            />
          </div>
        </Styled.ColorsListItem>
      ))}
    </Styled.ColorsList>
  );
}
