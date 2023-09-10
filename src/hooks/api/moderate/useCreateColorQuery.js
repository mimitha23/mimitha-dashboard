import { useDispatch } from "react-redux";

import { colorActions } from "store/reducers/moderate/colorReducer";

export default function useCreateColorQuery() {
  const dispatch = useDispatch();

  function createColorQuery({ args, isUpdating }) {
    isUpdating
      ? dispatch(colorActions.updateColor(args))
      : dispatch(colorActions.createColor(args));
  }

  return { createColorQuery };
}
