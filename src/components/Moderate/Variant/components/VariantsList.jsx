import { useVariantUtils } from "hooks/utils/moderate/variants";

import {
  EditAndDeleteButtons,
  LineClampedDescription,
} from "components/layouts";

export default function VariantsList({ filteredVariants, setActiveDeletion }) {
  const { onStartEdit } = useVariantUtils();

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
                <span>{variant.label_ka}</span>
              </p>
              <p>
                <span>en:</span>
                &nbsp;
                <span>{variant.label_en}</span>
              </p>
            </div>

            <LineClampedDescription clamp={2} text={variant.description_ka} />

            <EditAndDeleteButtons
              onEdit={() => onStartEdit(variant)}
              onDelete={() => setActiveDeletion(variant._id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
