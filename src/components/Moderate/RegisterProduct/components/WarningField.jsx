import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRegisterProductForm } from "store/selectors/moderateSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import WarningInput from "./WarningInput";
import EnteredWarningsList from "./EnteredWarningsList";
import * as Styled from "./styles/WarningField.styled";

export default function WarningField({ error }) {
  const dispatch = useDispatch();
  const { warning } = useSelector(selectRegisterProductForm);

  const [isUpdatingEnteredValue, setIsUpdatingEnteredValue] = useState("");

  function onAddWarning(e) {
    e.preventDefault();

    if (isUpdatingEnteredValue) {
      dispatch(
        registerProductActions.setUpdatedWarning(isUpdatingEnteredValue)
      );
      setIsUpdatingEnteredValue("");
    } else {
      dispatch(registerProductActions.addWarning());
    }
  }

  return (
    <Styled.WarningField>
      <label className="warning__main-label">გაფრთხილება</label>

      <div className="warning-fields--box">
        <WarningInput
          id="warning_ka"
          name="warning_ka"
          caption="ka"
          value={warning.warning_ka}
          onChange={(e) =>
            dispatch(
              registerProductActions.setWarning({
                key: e.target.name,
                value: e.target.value,
              })
            )
          }
        />

        <WarningInput
          id="warning_en"
          name="warning_en"
          caption="en"
          value={warning.warning_en}
          onChange={(e) =>
            dispatch(
              registerProductActions.setWarning({
                key: e.target.name,
                value: e.target.value,
              })
            )
          }
        />
      </div>

      <button onClick={onAddWarning} className="add-warning--btn">
        add warning
      </button>

      {error?.hasError && error?.error && <p>{error.error}</p>}

      <EnteredWarningsList
        error={error?.itemErrors}
        setIsUpdatingEnteredValue={setIsUpdatingEnteredValue}
      />
    </Styled.WarningField>
  );
}
