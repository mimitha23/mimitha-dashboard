import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRegisterProduct } from "store/selectors/moderateSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { CloseXIcon, EditIcon } from "components/layouts/Icons";
import * as Styled from "./styles/WarningField.styled";

export default function WarningField() {
  const dispatch = useDispatch();
  const { warnings } = useSelector(selectRegisterProduct);

  const [enteredValue, setEnteredValue] = useState("");
  const [isUpdatingEnteredValue, setIsUpdatingEnteredValue] = useState("");

  function onEnter(e) {
    if (e.key !== "Enter" || !enteredValue) return;

    if (isUpdatingEnteredValue) {
      dispatch(
        registerProductActions.updateWarning({
          _id: isUpdatingEnteredValue,
          value: enteredValue,
        })
      );

      setIsUpdatingEnteredValue("");
    } else {
      dispatch(registerProductActions.addWarning(enteredValue));
    }

    setEnteredValue("");
  }

  return (
    <Styled.WarningField>
      <label htmlFor="warning">გაფრთხილება</label>
      <input
        type="text"
        id="warning"
        className="warning-field"
        onKeyDown={onEnter}
        value={enteredValue}
        onChange={(e) => setEnteredValue(e.target.value)}
      />

      {warnings[0] && (
        <ul className="entered-warnings__list">
          {warnings.map((warning) => (
            <li key={warning._id} className="entered-warnings__list-item">
              <span>{warning.warning}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEnteredValue(
                    warnings.find((w) => w._id === warning._id)?.warning || ""
                  );

                  setIsUpdatingEnteredValue(warning._id);
                }}
              >
                <EditIcon />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(registerProductActions.removeWarning(warning._id));
                }}
              >
                <CloseXIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Styled.WarningField>
  );
}
