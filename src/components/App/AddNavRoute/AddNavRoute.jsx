import { InputText, Form, Button, LoadingSpinner } from "components/layouts";
import * as Styled from "./AddNavRoute.styled";

export default function AddNavRoute() {
  return (
    <Styled.AddNavRoute>
      <Form>
        <InputText
          id="route-label--ka"
          label="იარლიყი (ka)"
          name="label_ka"
          placeholder="სპორტული"
          // error={error.color_ka.hasError}
          // message={error.color_ka.message}
          // value={color_ka}
          // onChange={handleSetColor}
        />

        <InputText
          id="route-label--en"
          label="იარლიყი (en)"
          name="label_en"
          placeholder="sportswear"
          // error={error.color_en.hasError}
          // message={error.color_en.message}
          // value={color_en}
          // onChange={handleSetColor}
        />

        <Button
          caption={false ? "განახლება" : "შექმნა"}
          disabled={false}
          onClick={(e) => {
            e.preventDefault();
            // createColorQuery();
          }}
        />

        {false && <LoadingSpinner />}
      </Form>
    </Styled.AddNavRoute>
  );
}
