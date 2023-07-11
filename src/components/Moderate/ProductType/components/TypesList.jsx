import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { productTypeActions } from "store/reducers/moderate/productTypeReducer";
import { PATHS } from "config/routes";

import { EditAndDeleteButtons } from "components/layouts";
import * as Styled from "./TypesList.styled";

export default function TypesList({ filteredProductTypes, setActiveDeletion }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onEdit(type) {
    dispatch(productTypeActions.setProductTypeDefaults(type));
    navigate(PATHS.moderate_sidebar.createProductTypePage.absolutePath);
  }

  return (
    <Styled.TypesList>
      {filteredProductTypes.map((type) => (
        <li key={type._id} className="all-product--types__list-item">
          <div className="all-product--types__list-item--label">
            <p>
              <span>ka:</span>
              &nbsp;
              <span>{type.ka}</span>
            </p>
            <p>
              <span>en:</span>
              &nbsp;
              <span>{type.en}</span>
            </p>
          </div>

          <EditAndDeleteButtons
            onEdit={() => onEdit(type)}
            onDelete={() => setActiveDeletion(type._id)}
          />
        </li>
      ))}
    </Styled.TypesList>
  );
}
