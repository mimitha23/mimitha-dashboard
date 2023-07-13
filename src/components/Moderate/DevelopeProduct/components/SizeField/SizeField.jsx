/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectDevelopeProductForm } from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { extractObjectsArrayError } from "utils/validators/helpers/Validate";

import AmountInput from "./AmountInput";
import SizeFieldHeader from "./SizeFieldHeader";
import RemoveFieldButton from "./RemoveFieldButton";
import { InputFilterableSelect } from "components/layouts";
import * as Styled from "./SizeField.styled";

export default function SizeField({ sizes, error }) {
  const dispatch = useDispatch();
  const { sizes: selectedSizes } = useSelector(selectDevelopeProductForm);

  const onSetSize = useCallback(({ key, value, sizeId }) => {
    dispatch(
      developeProductActions.setSize({
        key,
        value,
        fieldId: sizeId,
      })
    );
  }, []);

  const onSelectSize = useCallback(({ value, sizeId }) => {
    dispatch(
      developeProductActions.selectSize({
        value,
        fieldId: sizeId,
      })
    );
  }, []);

  return (
    <Styled.SizeField>
      <SizeFieldHeader />

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
                value={size.size.caption || ""}
                error={extractedError.size?.hasError || false}
                message={extractedError.size?.message || ""}
                setValue={({ key, value }) =>
                  onSetSize({ key, value, sizeId: size._id })
                }
                selectValue={({ value }) =>
                  onSelectSize({ value, sizeId: size._id })
                }
              />

              <AmountInput
                error={extractedError}
                onSetSize={onSetSize}
                size={size}
              />

              {i > 0 && <RemoveFieldButton sizeId={size._id} />}
            </li>
          );
        })}
      </ul>
    </Styled.SizeField>
  );
}
