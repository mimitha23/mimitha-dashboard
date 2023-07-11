import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { productStyleActions } from "store/reducers/moderate/productStyleReducer";
import { PATHS } from "config/routes";

import { EditAndDeleteButtons } from "components/layouts";
import * as Styled from "./StylesList.styled";

export default function StylesList({
  filteredProductStyles,
  setActiveDeletion,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onEdit(style) {
    dispatch(productStyleActions.setProductStyleDefaults(style));
    navigate(PATHS.moderate_sidebar.createProductStylePage.absolutePath);
  }

  return (
    <Styled.StylesList className="all-product--styles__list">
      {filteredProductStyles.map((style) => (
        <li key={style._id} className="all-product--styles__list-item">
          <div className="all-product--styles__list-item--label">
            <p>
              <span>ka:</span>
              &nbsp;
              <span>{style.ka}</span>
            </p>
            <p>
              <span>en:</span>
              &nbsp;
              <span>{style.en}</span>
            </p>
          </div>

          <EditAndDeleteButtons
            onEdit={() => onEdit(style)}
            onDelete={() => setActiveDeletion(style._id)}
          />
        </li>
      ))}
    </Styled.StylesList>
  );
}
