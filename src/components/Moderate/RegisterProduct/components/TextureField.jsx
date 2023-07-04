import { useSelector, useDispatch } from "react-redux";

import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { selectRegisterProductForm } from "store/selectors/moderateSelectors";

import extractError from "../functions/extractObjectsArrayErrors";

import { PlusIcon } from "components/layouts/Icons";
import * as Styled from "./styles/TextureField.styled";

export default function TextureField({ error }) {
  const dispatch = useDispatch();

  const { texture: textures } = useSelector(selectRegisterProductForm);

  return (
    <Styled.TextureField
      className={textures.length > 1 ? "filled-texture" : ""}
    >
      <div className="texture-head">
        <label>ტექსტურა</label>
        <button
          className="add-texture--field__btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch(registerProductActions.addTextureField());
          }}
        >
          <span>დაამატე ველი</span>
          <span>
            <PlusIcon />
          </span>
        </button>
      </div>

      {textures.map((texture, i) => {
        const extractedError = extractError(error.itemErrors[i]);

        return (
          <div className="texture-field--box" key={texture._id}>
            <div className="texture-field">
              <label>ka:</label>
              <input
                type="text"
                name="texture_ka"
                placeholder="ბამბა"
                value={texture.texture_ka}
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
              {extractedError.texture_ka?.hasError && (
                <p className="texture-field__message">
                  {extractedError.texture_ka?.message}
                </p>
              )}
            </div>

            <div className="texture-field">
              <label>en:</label>
              <input
                type="text"
                name="texture_en"
                placeholder="cotton"
                value={texture.texture_en}
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
              {extractedError.texture_en?.hasError && (
                <p className="texture-field__message">
                  {extractedError.texture_en?.message}
                </p>
              )}
            </div>

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
                <p className="texture-field__message">
                  {extractedError.texture_ka?.message}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </Styled.TextureField>
  );
}
