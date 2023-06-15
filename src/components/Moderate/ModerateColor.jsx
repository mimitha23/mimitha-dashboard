import { useState } from "react";

import { isValidHexColor } from "functions";

import { Form, InputText, Button } from "components/layouts";
import * as Styled from "./styles/ModerateColor.styled";

export default function ModerateColor() {
  const [colorInHex, setColorInHex] = useState("");

  return (
    <Styled.ModerateColor colorinhex={colorInHex}>
      <h4 className="moderator-title">შექმენი ფერი</h4>
      <Form>
        <InputText
          id="color-label"
          label="ფერის სახელი"
          message="მესიჯი"
          name="label"
          placeholder="მწვანე"
        />

        <InputText
          id="color-hex"
          label="ფერი hex in decimal ფორმატში"
          message="მესიჯი"
          name="color"
          placeholder="#26E066"
          value={colorInHex}
          onChange={(e) => setColorInHex(e.target.value)}
        />

        {isValidHexColor(colorInHex) && <div className="picked-color"></div>}

        <Button caption="შექმნა" />
      </Form>
    </Styled.ModerateColor>
  );
}
