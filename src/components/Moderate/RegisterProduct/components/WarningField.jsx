import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRegisterProductForm } from "store/selectors/moderateSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { CloseXIcon, EditIcon } from "components/layouts/Icons";
import * as Styled from "./styles/WarningField.styled";

export default function WarningField() {
  const dispatch = useDispatch();
  const { warnings } = useSelector(selectRegisterProductForm);

  const [warning_ka, setWarning_ka] = useState("");
  const [warning_en, setWarning_en] = useState("");
  const [isUpdatingEnteredValue, setIsUpdatingEnteredValue] = useState("");

  function onAddWarning(e) {
    if (isUpdatingEnteredValue) {
      dispatch(
        registerProductActions.updateWarning({
          _id: isUpdatingEnteredValue,
          value: {
            ka: warning_ka,
            en: warning_en,
          },
        })
      );

      setIsUpdatingEnteredValue("");
    } else {
      dispatch(
        registerProductActions.addWarning({ ka: warning_ka, en: warning_en })
      );
    }

    setWarning_ka("");
    setWarning_en("");
  }

  function onEditWarning(warning) {
    const warn = warnings.find((w) => w._id === warning._id);
    setWarning_ka(warn.ka);
    setWarning_en(warn.en);
    setIsUpdatingEnteredValue(warning._id);
  }

  return (
    <Styled.WarningField>
      <label>გაფრთხილება</label>

      <div className="warning-fields--box">
        <div className="warning-fields--box__field">
          <label htmlFor="warning_ka">ka:</label>
          <input
            type="text"
            id="warning_ka"
            className="warning-field"
            value={warning_ka}
            onChange={(e) => setWarning_ka(e.target.value)}
          />
        </div>
        <div className="warning-fields--box__field">
          <label htmlFor="warning_en">en:</label>
          <input
            type="text"
            id="warning_en"
            className="warning-field"
            value={warning_en}
            onChange={(e) => setWarning_en(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          onAddWarning();
        }}
        className="add-warning--btn"
      >
        add warning
      </button>

      {warnings[0] && (
        <ul className="entered-warnings__list">
          {warnings.map((warning) => (
            <li key={warning._id} className="entered-warnings__list-item">
              <button
                className="entered-warnings__list-item--btn edit"
                onClick={(e) => {
                  e.preventDefault();
                  onEditWarning(warning);
                }}
              >
                <EditIcon />
              </button>
              <button
                className="entered-warnings__list-item--btn remove"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(registerProductActions.removeWarning(warning._id));
                }}
              >
                <CloseXIcon />
              </button>

              <p className="entered-warnings__list-item--label label_ka">
                <span>ka:</span>
                &nbsp;
                <span>{warning.ka}</span>
              </p>
              <p className="entered-warnings__list-item--label label_en">
                <span>en:</span>
                &nbsp;
                <span>{warning.en}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </Styled.WarningField>
  );
}
