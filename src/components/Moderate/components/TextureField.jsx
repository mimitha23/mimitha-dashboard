import * as Styled from "./styles/TextureField.styled";
import { useSelector, useDispatch } from "react-redux";

import { registerProductActions } from "store/reducers/moderate/registerProductReducer";
import { selectRegisterProduct } from "store/selectors/moderateSelectors";

export default function TextureField() {
  const dispatch = useDispatch();

  const { texture: textures } = useSelector(selectRegisterProduct);

  return (
    <Styled.TextureField>
      <div className="texture-head">
        <label>ტექსტურა</label>
        <label>დაამატე ველი</label>
      </div>

      {textures.map((texture) => (
        <div className="texture-field--box" key={texture._id}>
          <div className="texture-field">
            <label>ka:</label>
            <input
              type="text"
              name="texture"
              placeholder="ბამბა"
              value={texture.name_ka}
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
          </div>

          <div className="texture-field">
            <label>en:</label>
            <input
              type="text"
              name="texture"
              placeholder="cotton"
              value={texture.name_en}
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
          </div>
        </div>
      ))}
    </Styled.TextureField>
  );
}
