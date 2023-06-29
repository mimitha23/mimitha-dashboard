import { PATHS } from "config/routes";

import {
  Form,
  InputText,
  Button,
  InputFile,
  InputFilterableSelect,
  InputTextarea,
} from "components/layouts";
import AddDevelopedProductBlueprint from "./components/AddDevelopedProductBlueprint";
import AddVariantField from "./components/AddVariantField";
import ModerateHeader from "../components/ModerateHeader";
import * as Styled from "./styles/AddDevelopedProduct.styled";

export default function AddDevelopedProduct() {
  return (
    <Styled.AddDevelopedProduct>
      <ModerateHeader
        title="განავითარე პროდუქტი"
        linkCaption="ნახე ყველა მიმაგრებული პროდუქტი"
        redirectPath={PATHS.moderate_nested_routes.developedProductsPage.absolutePath(
          { registeredProductId: "registered-product-id" }
        )}
      />

      <div className="add-developed--product__content">
        <div className="add-developed--product__form-wrapper">
          <Form>
            <InputText
              id="product-title_ka"
              label="პროდუქტის სათაური (ka)"
              message="მესიჯი"
              name="title_ka"
              placeholder="შავი ჰუდი ჯიბით"
            />

            <InputText
              id="product-title_en"
              label="პროდუქტის სათაური (en)"
              message="მესიჯი"
              name="title_en"
              placeholder="black hoody with pocket"
            />

            <InputText
              id="product-price"
              label="პროდუქტის ფასი"
              message="მესიჯი"
              name="price"
              placeholder="30"
              type="number"
            />

            <InputFilterableSelect
              id="sale"
              label="ფასდაკლება"
              message="მესიჯი"
              name="sale"
              placeholder="sale"
              // anotation="აირჩიე არსებული ვარიანტის ტიპი ან შექმენი ახალი"
              list={["კი", "არა"]}
            />

            <InputText
              id="product-new--price"
              label="პროდუქტის ახალი ფასი"
              message="მესიჯი"
              name="newPrice"
              placeholder="30"
              type="number"
            />

            <InputFilterableSelect
              id="color"
              label="ფერი"
              message="მესიჯი"
              name="color"
              placeholder="ლურჯი"
              anotation="აირჩიეთ ფერი"
              list={["წითელი", "ყვითელი", "ლურჯი", "მწვანე", "შავი", "თეთრი"]}
            />

            <InputFilterableSelect
              id="size"
              label="ზომა"
              message="მესიჯი"
              name="size"
              placeholder="sm"
              anotation="აირჩიეთ ზომა"
              list={["xs", "s", "m", "l", "xl", "xxl", "2xl"]}
            />

            <InputText
              id="size-in-stock"
              label="პროდუქტის მარაგი"
              message="მესიჯი"
              name="stock"
              placeholder="30"
              type="number"
            />

            <AddVariantField />

            <InputTextarea
              id="product-description--ka"
              label="პროდუქტის აღწერა (ka)"
              message="მესიჯი"
              name="description_ka"
              placeholder="აღწერე პროდუქტი..."
            />

            <InputTextarea
              id="product-description--en"
              label="პროდუქტის აღწერა (en)"
              message="მესიჯი"
              name="description_en"
              placeholder="describe product..."
            />

            <InputFile
              name="icon"
              // fileRef={fileRef}
              // file={file}
              // onChange={(e) => setFile(e.target.files[0])}
              label="დაამატეთ პროდუქტის მედია ფაილები"
            />

            <Button caption="შექმნა" />
          </Form>
        </div>

        <AddDevelopedProductBlueprint />
      </div>
    </Styled.AddDevelopedProduct>
  );
}
