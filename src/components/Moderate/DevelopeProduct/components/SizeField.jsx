import { useSelector, useDispatch } from "react-redux";
import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";

import { InputFilterableSelect } from "components/layouts";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { extractObjectsArrayError } from "utils/validators/helpers/Validate";

import { PlusIcon, MinusIcon } from "components/layouts/Icons";
import * as Styled from "./styles/SizeField.styled";

export default function SizeField({ sizes, error }) {
  const dispatch = useDispatch();
  const { sizes: selectedSizes } = useSelector(selectDevelopeProductForm);

  function onSetSize({ key, value, sizeId }) {
    dispatch(
      developeProductActions.setSize({
        key,
        value,
        fieldId: sizeId,
      })
    );
  }

  function onSelectSize({ value, sizeId }) {
    dispatch(
      developeProductActions.selectSize({
        value,
        fieldId: sizeId,
      })
    );
  }

  return (
    <Styled.SizeField>
      <div className="size-field__header">
        <label>ზომა</label>
        <button
          className="size-field__add-btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch(developeProductActions.addSizeField());
          }}
        >
          <span>დაამატე ველი</span>
          <span>
            <PlusIcon />
          </span>
        </button>
      </div>

      <ul className="size-field__inps-list">
        {selectedSizes.map((size, i) => {
          const extractedError = extractObjectsArrayError(error.itemErrors[i]);

          return (
            <li className="size-field__inps" key={size._id}>
              <InputFilterableSelect
                id="size"
                name="size"
                placeholder="sm"
                anotation="აირჩიე არსებული ზომა ან შექმენი ახალი"
                list={sizes}
                value={size.size.caption}
                error={extractedError.size?.hasError}
                message={extractedError.size?.message}
                setValue={({ key, value }) =>
                  onSetSize({ key, value, sizeId: size._id })
                }
                selectValue={({ value }) =>
                  onSelectSize({ value, sizeId: size._id })
                }
              />

              <div className="size-field__inps-amount--inp">
                <input
                  type="number"
                  placeholder="რაოდენობა"
                  className={extractedError.amount?.hasError ? "error" : ""}
                  name="amount"
                  onChange={(e) =>
                    onSetSize({
                      key: e.target.name,
                      value: e.target.value,
                      sizeId: size._id,
                    })
                  }
                />

                {extractedError.amount?.hasError && (
                  <p className="size-field__message">
                    {extractedError.amount?.message}
                  </p>
                )}
              </div>

              {i > 0 && (
                <button
                  className="size-field__remove-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(developeProductActions.removeSizeField(size._id));
                  }}
                >
                  <MinusIcon />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Styled.SizeField>
  );
}
