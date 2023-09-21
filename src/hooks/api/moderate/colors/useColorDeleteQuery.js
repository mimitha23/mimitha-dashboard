import { useState } from "react";
import { useDispatch } from "react-redux";

import { colorActions } from "store/reducers/moderate/colorReducer";

export default function useDeleteColorQuery() {
  const dispatch = useDispatch();

  const [activeDeletion, setActiveDeletion] = useState("");

  function onColorDeleteQuery() {
    dispatch(colorActions.deleteColor(activeDeletion));
    setActiveDeletion("");
  }

  return { onColorDeleteQuery, activeDeletion, setActiveDeletion };
}
