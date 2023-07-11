import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { colorActions } from "store/reducers/moderate/colorReducer";
import { PATHS } from "config/routes";

import { EditAndDeleteButtons } from "components/layouts";
import * as Styled from "./ColorsList.styled";

export default function ColorsList({ filteredColors, setActiveDeletion }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onEdit(color) {
    dispatch(colorActions.setColorDefaults(color));
    navigate(PATHS.moderate_sidebar.createColorPage.absolutePath);
  }

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
              onEdit={() => onEdit(color)}
              onDelete={() => setActiveDeletion(color._id)}
            />
          </div>
        </Styled.ColorsListItem>
      ))}
    </Styled.ColorsList>
  );
}
