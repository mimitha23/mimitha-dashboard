import { useState } from "react";
import { useDispatch } from "react-redux";

import { productTypeActions } from "store/reducers/moderate/productTypeReducer";

export default function useProductTypeDeleteQuery() {
  const dispatch = useDispatch();

  const [activeDeletion, setActiveDeletion] = useState("");

  function onProductTypeDeleteQuery() {
    dispatch(productTypeActions.deleteProductType(activeDeletion));
    setActiveDeletion("");
  }

  return { activeDeletion, setActiveDeletion, onProductTypeDeleteQuery };
}
