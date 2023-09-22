import { useProductTypeUtils } from "hooks/utils/moderate/productTypes";

import * as Styled from "./TypesList.styled";
import { EditAndDeleteButtons } from "components/layouts";

export default function TypesList({ filteredProductTypes, setActiveDeletion }) {
  const { onStartEdit } = useProductTypeUtils();

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
            onEdit={() => onStartEdit(type)}
            onDelete={() => setActiveDeletion(type._id)}
          />
        </li>
      ))}
    </Styled.TypesList>
  );
}
