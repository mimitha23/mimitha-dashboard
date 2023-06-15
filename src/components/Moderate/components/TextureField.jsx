import * as Styled from "./styles/TextureField.styled";

export default function TextureField() {
  return (
    <Styled.TextureField>
      <div className="texture-head">
        <label>ტექსტურა</label>
        <label>დაამატე ველი</label>
      </div>

      <div className="texture-field--box">
        <div className="texture-field">
          <label>ka:</label>
          <input type="text" name="texture" placeholder="cotton" />
        </div>

        <div className="texture-field">
          <label>en:</label>
          <input type="text" name="texture" placeholder="ბამბა" />
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
          />
        </div>
      </div>
    </Styled.TextureField>
  );
}
