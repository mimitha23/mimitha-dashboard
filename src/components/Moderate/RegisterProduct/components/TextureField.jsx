import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectRegisterProductForm,
  selectRegisterProductFormSugestions,
} from "store/selectors/moderateSelectors";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import extractError from "../functions/extractObjectsArrayErrors";

import { InputFilterableSelect } from "components/layouts";
import TextureFieldHeader from "./TextureFieldHeader";
import * as Styled from "./styles/TextureField.styled";

export default function TextureField({ error }) {
  const dispatch = useDispatch();

  const { textures: enteredTextures } = useSelector(selectRegisterProductForm);
  const { textures: textureSugestions } = useSelector(
    selectRegisterProductFormSugestions
  );

  const setTexture = useCallback(
    ({ key, value, texture }) => {
      dispatch(
        registerProductActions.setTexture({
          key,
          value,
          _id: texture._id,
        })
      );
    },
    [dispatch]
  );

  return (
    <Styled.TextureField>
      <TextureFieldHeader />

      {enteredTextures.map((texture, i) => {
        const extractedError = extractError(error.itemErrors[i]);

        return (
          <div className="texture-field--box" key={texture._id}>
            <InputFilterableSelect
              id="texture"
              name="textures"
              placeholder="აირჩიეთ ტექსტურა"
              list={textureSugestions}
              error={extractedError.textures?.hasError}
              message={extractedError.textures?.message}
              value={texture.caption || ""}
              setValue={({ key, value }) => setTexture({ key, value, texture })}
            />

            <div className="percentage-field">
              <label>%</label>
              <input
                type="number"
                className="percentage-input"
                name="percentage"
                placeholder="100"
                max={100}
                min={0}
                value={texture.percentage}
                onChange={(e) =>
                  dispatch(
                    registerProductActions.setTexture({
                      key: e.target.name,
                      value: e.target.value,
                      _id: texture._id,
                    })
                  )
                }
              />
              {extractedError.percentage?.hasError && (
                <p className="percentage-field__message">
                  {extractedError.percentage?.message}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </Styled.TextureField>
  );
}
