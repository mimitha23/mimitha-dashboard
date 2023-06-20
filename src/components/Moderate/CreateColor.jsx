import { useDispatch, useSelector } from "react-redux";

import { setColor } from "store/reducers/moderate/createColorReducer";
import { selectCreateColor } from "store/selectors/moderateSelectors";
import { useCreateColorQuery } from "hooks/api/moderate";

import { isValidHexColor } from "functions";

import { Form, InputText, Button } from "components/layouts";
import * as Styled from "./styles/CreateColor.styled";

export default function CreateColor() {
  const dispatch = useDispatch();
  const { createColorQuery, error } = useCreateColorQuery();
  const { color_ka, color_en, color_hex } = useSelector(selectCreateColor);

  return (
    <Styled.CreateColor colorinhex={color_hex}>
      <h4 className="moderator-title">შექმენი ფერი</h4>
      <Form>
        <InputText
          id="color-label--ka"
          label="ფერი (ka)"
          name="color_ka"
          placeholder="მწვანე"
          error={error.color_ka.hasError}
          message={error.color_ka.message}
          value={color_ka}
          onChange={(e) =>
            dispatch(setColor({ key: e.target.name, value: e.target.value }))
          }
        />

        <InputText
          id="color-label--en"
          label="ფერი (en)"
          name="color_en"
          placeholder="green"
          error={error.color_en.hasError}
          message={error.color_en.message}
          value={color_en}
          onChange={(e) =>
            dispatch(setColor({ key: e.target.name, value: e.target.value }))
          }
        />

        <InputText
          id="color-hex"
          label="ფერი hex in decimal ფორმატში"
          name="color_hex"
          placeholder="#26E066"
          error={error.color_hex.hasError}
          message={error.color_hex.message}
          value={color_hex}
          onChange={(e) =>
            dispatch(setColor({ key: e.target.name, value: e.target.value }))
          }
        />

        {isValidHexColor(color_hex) && <div className="picked-color"></div>}

        <Button
          caption="შექმნა"
          onClick={(e) => {
            e.preventDefault();
            createColorQuery();
          }}
        />
      </Form>
    </Styled.CreateColor>
  );
}
