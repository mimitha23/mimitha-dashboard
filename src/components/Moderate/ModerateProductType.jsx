import * as Styled from "./styles/ModerateProductType.styled";
import { Form, InputText, Button } from "components/layouts";

export default function ModerateProductType() {
  return (
    <Styled.ModerateProductType>
      <h4 className="moderator-title">შექმენი პროდუქტის ტიპი</h4>
      <Form>
        <InputText
          id="product-label-ka"
          label="პროდუქტის ტიპის იარლიყი (ka)"
          message="მესიჯი"
          name="label_ka"
          placeholder="კარგო შარვალი"
        />

        <InputText
          id="product-label-en"
          label="პროდუქტის ტიპის იარლიყი (en)"
          message="მესიჯი"
          name="label_en"
          placeholder="cargo trousers"
        />

        <InputText
          id="product-type"
          label="პროდუქტის ტიპის მონიშვნა"
          message="მესიჯი"
          name="query"
          placeholder="cargo trousers"
          anotation="გამოყავით შორისით, შეიყვანეთ ლათინური ასოებით"
        />

        <Button caption="შექმნა" />
      </Form>
    </Styled.ModerateProductType>
  );
}
