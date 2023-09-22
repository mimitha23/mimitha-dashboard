import { useDevelopeProductUtils } from "hooks/utils/moderate/developeProduct";
import { useDevelopeProductDeleteQuery } from "hooks/api/moderate/developeProduct";

import { DeletionPopup } from "components/layouts";
import * as Styled from "./styles/DevelopedProductActions.styled";

export default function DevelopedProductActions({
  registeredProductId,
  developedProductId,
}) {
  const { onStartEdit } = useDevelopeProductUtils();

  const { activeDeletion, setActiveDeletion, onDevelopedProductDeleteQuery } =
    useDevelopeProductDeleteQuery();

  return (
    <>
      <Styled.DevelopedProductActions>
        <button
          onClick={() => setActiveDeletion(developedProductId)}
          className="developed-product--actions__btn delete"
        >
          წაშალე
        </button>
        <button
          onClick={() =>
            onStartEdit({
              registeredProductId,
              developedProductId,
              resetActive: true,
            })
          }
          className="developed-product--actions__btn edit"
        >
          რედაქტირება
        </button>
      </Styled.DevelopedProductActions>

      {activeDeletion && (
        <DeletionPopup
          targetName="პროდუქტი"
          onConfirm={() =>
            onDevelopedProductDeleteQuery({
              developedProductId,
              registeredProductId,
            })
          }
          onClose={() => setActiveDeletion("")}
        />
      )}
    </>
  );
}
