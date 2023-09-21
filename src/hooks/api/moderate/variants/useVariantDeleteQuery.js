import { useState } from "react";
import { useDispatch } from "react-redux";

import { variantActions } from "store/reducers/moderate/variantReducer";

export default function useVariantDeleteQuery() {
  const dispatch = useDispatch();
  const [activeDeletion, setActiveDeletion] = useState("");

  function onVariantDeleteQuery() {
    dispatch(variantActions.deleteVariant(activeDeletion));
    setActiveDeletion("");
  }

  return { activeDeletion, setActiveDeletion, onVariantDeleteQuery };
}
