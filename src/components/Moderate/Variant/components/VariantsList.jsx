import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { variantActions } from "store/reducers/moderate/variantReducer";
import { PATHS } from "config/routes";

import {
  EditAndDeleteButtons,
  LineClampedDescription,
} from "components/layouts";

export default function VariantsList({ filteredVariants, setActiveDeletion }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onEdit(variant) {
    dispatch(variantActions.setVariantDefaults(variant));
    navigate(PATHS.moderate_sidebar.createVariantPage.absolutePath);
  }

  return (
    <ul className="all-variants__list">
      {filteredVariants.map((variant) => (
        <li key={variant._id} className="all-variants__list-item">
          <figure className="all-variants__list-item--icon">
            <svg>
              <image xlinkHref={variant.icon} />
            </svg>
          </figure>

          <div className="all-variants__list-item--body">
            <p>
              <span>type:</span>
              &nbsp;
              <span>{variant.type}</span>
            </p>

            <div className="all-variants__list-item--label">
              <p>
                <span>ka:</span>
                &nbsp;
                <span>{variant.ka}</span>
              </p>
              <p>
                <span>en:</span>
                &nbsp;
                <span>{variant.en}</span>
              </p>
            </div>

            <LineClampedDescription clamp={2} text={variant.description} />

            <EditAndDeleteButtons
              onEdit={() => onEdit(variant)}
              onDelete={() => setActiveDeletion(variant._id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
