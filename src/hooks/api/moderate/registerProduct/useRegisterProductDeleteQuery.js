import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

export default function useRegisterProductDeleteQuery() {
  const dispatch = useDispatch();

  const [activeDeletion, setActiveDeletion] = useState("");

  function onRegisteredProductDeleteQuery() {
    dispatch(registerProductActions.deleteRegisteredProduct(activeDeletion));
    setActiveDeletion("");
  }

  return { activeDeletion, setActiveDeletion, onRegisteredProductDeleteQuery };
}
