import { useState } from "react";
import { useDispatch } from "react-redux";

import { textureActions } from "store/reducers/moderate/textureReducer";

export default function useTextureDeleteQuery() {
  const dispatch = useDispatch();

  const [activeDeletion, setActiveDeletion] = useState("");

  function onTextureDeleteQuery() {
    dispatch(textureActions.deleteTexture(activeDeletion));
    setActiveDeletion("");
  }

  return { onTextureDeleteQuery, activeDeletion, setActiveDeletion };
}
