import * as Styled from "./styles/RegisterProduct.styled";
import { Form, Button, InputFilterableSelect } from "components/layouts";
import TextureField from "./components/TextureField";

export default function RegisterProduct() {
  const productTypes = [
    "hoody",
    "trousers",
    "cargo trousers",
    "jacket",
    "coat",
    "shirt",
    "t-shirt",
  ];

  const seasons = ["გაზაფხული", "ზაფხული", "შემოდგომა", "ზამთარი"];

  const styles = ["ყოველდღიური", "სპორტული", "მსუბუქი"];

  return (
    <Styled.RegisterProduct>
      <h4 className="moderator-title">დაარეგისტრირე პროდუქტი</h4>
      <Form>
        <InputFilterableSelect
          readOnly={true}
          id="product-type"
          label="პროდუქტის ტიპი"
          message="მესიჯი"
          name="productType"
          placeholder="აირჩიეთ პროდუქტის ტიპი"
          list={productTypes}
        />

        <InputFilterableSelect
          readOnly={true}
          id="season"
          label="სეზონი"
          message="მესიჯი"
          name="season"
          placeholder="აირჩიეთ სეზონი"
          list={seasons}
        />

        <InputFilterableSelect
          readOnly={true}
          id="style"
          label="სტილი"
          message="მესიჯი"
          name="style"
          placeholder="აირჩიეთ სტილი"
          list={styles}
        />

        <TextureField />

        <Button caption="შექმნა" />
      </Form>
    </Styled.RegisterProduct>
  );
}
