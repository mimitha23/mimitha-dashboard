import { useProductStyleUtils } from "hooks/utils/moderate/productStyles";

import * as Styled from "./StylesList.styled";
import { EditAndDeleteButtons } from "components/layouts";

export default function StylesList({
  filteredProductStyles,
  setActiveDeletion,
}) {
  const { onStartEdit } = useProductStyleUtils();

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
            onEdit={() => onStartEdit(style)}
            onDelete={() => setActiveDeletion(style._id)}
          />
        </li>
      ))}
    </Styled.StylesList>
  );
}
