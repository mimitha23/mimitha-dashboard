import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectRegisterProductForm,
  selectRegisterProductFormSuggestions,
} from "store/selectors/moderate/registerProductSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { extractObjectsArrayError } from "utils/validators/helpers/Validate";

import { MinusIcon } from "components/layouts/Icons";
import { InputFilterableSelect } from "components/layouts";
import TextureFieldHeader from "./TextureFieldHeader";
import * as Styled from "./styles/TextureField.styled";

export default memo(function TextureField({ error }) {
  const dispatch = useDispatch();

  const { textures: enteredTextures } = useSelector(selectRegisterProductForm);
  const { textures: textureSuggestions } = useSelector(
    selectRegisterProductFormSuggestions
  );

  const setTexture = useCallback(
    ({ key, value, fieldId }) => {
      dispatch(
        registerProductActions.setTexture({
          key,
          value,
          fieldId: fieldId,
        })
      );
    },
    [dispatch]
  );

  const selectTexture = useCallback(
    ({ key, value, fieldId }) => {
      dispatch(
        registerProductActions.selectTexture({
          key,
          value,
          fieldId: fieldId,
        })
      );
    },
    [dispatch]
  );

  return (
    <Styled.TextureField>
      <TextureFieldHeader />

      <ul className="texture-field__list">
        {enteredTextures.map((texture, i) => {
          const extractedError = extractObjectsArrayError(error.itemErrors[i]);

          return (
            <li className="texture-field__list-item" key={texture._id}>
              <InputFilterableSelect
                id="texture"
                name="textures"
                placeholder="აირჩიეთ ტექსტურა"
                list={textureSuggestions}
                error={extractedError.textures?.hasError}
                message={extractedError.textures?.message}
                value={texture.textures?.caption || ""}
                setValue={({ key, value }) =>
                  setTexture({ key, value, fieldId: texture._id })
                }
                selectValue={({ key, value }) =>
                  selectTexture({ key, value, fieldId: texture._id })
                }
              />

              <div className="percentage-field">
                <label>%</label>
                <input
                  type="number"
                  className={`percentage-input ${
                    extractedError.percentage?.hasError ? "error" : ""
                  }`}
                  name="percentage"
                  placeholder="100"
                  max={100}
                  min={0}
                  value={texture.percentage}
                  onChange={(e) =>
                    setTexture({
                      key: e.target.name,
                      value: e.target.value,
                      fieldId: texture._id,
                    })
                  }
                />

                {extractedError.percentage?.hasError && (
                  <p className="percentage-field__message">
                    {extractedError.percentage?.message}
                  </p>
                )}
              </div>

              {i > 0 && (
                <button
                  className="texture-field__remove-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      registerProductActions.removeTextureField(texture._id)
                    );
                  }}
                >
                  <MinusIcon />
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {error.hasError && error.message && <p>{error.message}</p>}
    </Styled.TextureField>
  );
});
