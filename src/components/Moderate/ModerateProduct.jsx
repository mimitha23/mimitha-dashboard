import * as Styled from "./styles/ModerateProduct.styled";
import { Form, Button, InputFilterableSelect } from "components/layouts";
import TextureField from "./components/TextureField";

export default function ModerateProduct() {
  return (
    <Styled.ModerateProduct>
      <h4 className="moderator-title">დაარეგისტრირე პროდუქტი</h4>
      <Form>
        <InputFilterableSelect
          readOnly={true}
          id="product-type"
          label="პროდუქტის ტიპი"
          message="მესიჯი"
          name="productType"
          placeholder="აირჩიეთ პროდუქტის ტიპი"
        />

        <TextureField />

        <Button caption="შექმნა" />
      </Form>
    </Styled.ModerateProduct>
  );
}
