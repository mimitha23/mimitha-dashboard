import { useState } from "react";
import { useDispatch } from "react-redux";

import { productStyleActions } from "store/reducers/moderate/productStyleReducer";

export default function useProductStyleDeleteQuery() {
  const dispatch = useDispatch();

  const [activeDeletion, setActiveDeletion] = useState("");

  function onProductStyleDeleteQuery() {
    dispatch(productStyleActions.deleteProductStyle(activeDeletion));
    setActiveDeletion("");
  }

  return { activeDeletion, setActiveDeletion, onProductStyleDeleteQuery };
}
