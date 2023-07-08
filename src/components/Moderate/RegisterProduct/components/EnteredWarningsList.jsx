import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRegisterProductForm } from "store/selectors/moderate/registerProductSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import extractError from "../functions/extractObjectsArrayErrors";

import { CloseXIcon, EditIcon } from "components/layouts/Icons";

export default function EnteredWarningsList({
  setIsUpdatingEnteredValue,
  error,
}) {
  const dispatch = useDispatch();

  const { warnings } = useSelector(selectRegisterProductForm);

  function onEditWarning(warning) {
    dispatch(registerProductActions.updateWarning(warning._id));
    setIsUpdatingEnteredValue(warning._id);
  }

  return (
    warnings[0] && (
      <ul className="entered-warnings__list">
        {warnings.map((warning, i) => {
          const extractedError = extractError(error[i]);

          return (
            <Fragment key={warning._id}>
              {warning.ka && warning.en && (
                <li className="entered-warnings__list-item">
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
                      dispatch(
                        registerProductActions.removeWarning(warning._id)
                      );
                    }}
                  >
                    <CloseXIcon />
                  </button>

                  <div className="entered-warnings__list-item--label label_ka">
                    <span>ka:</span>
                    &nbsp;
                    <span>{warning.ka}</span>
                    {extractedError.ka?.hasError && (
                      <p>{extractedError.ka.message}</p>
                    )}
                  </div>

                  <div className="entered-warnings__list-item--label label_en">
                    <span>en:</span>
                    &nbsp;
                    <span>{warning.en}</span>
                    {extractedError.en?.hasError && (
                      <p>{extractedError.en.message}</p>
                    )}
                  </div>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    )
  );
}
