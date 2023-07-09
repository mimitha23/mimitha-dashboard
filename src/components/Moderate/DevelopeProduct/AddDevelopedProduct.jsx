/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectDevelopeProductStatus,
  selectDevelopeProductForm,
  selectDevelopeProductFormSugestions,
} from "store/selectors/moderate/developeProductSelectors";
import { developeProductActions } from "store/reducers/moderate/developeProductReducer";

import { PATHS } from "config/routes";

import {
  Form,
  InputText,
  Button,
  InputFile,
  InputFilterableSelect,
  InputTextarea,
  LoadingSpinner,
} from "components/layouts";
import AddDevelopedProductBlueprint from "./components/AddDevelopedProductBlueprint";
import AddVariantField from "./components/AddVariantField";
import ModerateHeader from "../components/ModerateHeader";
import SizeField from "./components/SizeField";
import * as Styled from "./styles/AddDevelopedProduct.styled";

export default function AddDevelopedProduct() {
  const dispatch = useDispatch();
  const { colors, variants, sizes } = useSelector(
    selectDevelopeProductFormSugestions
  );

  const status = useSelector(selectDevelopeProductStatus);
  const { color } = useSelector(selectDevelopeProductForm);

  function setDevelopedProduct(e) {
    dispatch(
      developeProductActions.setDevelopedProduct({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  useEffect(() => {
    dispatch(developeProductActions.getDevelopeProductFormSugestions());
  }, []);

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
              onChange={setDevelopedProduct}
            />

            <InputText
              id="product-title_en"
              label="პროდუქტის სათაური (en)"
              message="მესიჯი"
              name="title_en"
              placeholder="black hoody with pocket"
              onChange={setDevelopedProduct}
            />

            <InputText
              id="product-price"
              label="პროდუქტის ფასი"
              message="მესიჯი"
              name="price"
              placeholder="30"
              type="number"
              onChange={setDevelopedProduct}
            />

            <InputFilterableSelect
              id="color"
              label="ფერი"
              name="color"
              message="მესიჯი"
              placeholder="ლურჯი"
              list={colors}
              value={color?.caption || ""}
              setValue={({ value: enteredValue }) => {
                dispatch(
                  developeProductActions.setColor({ value: enteredValue })
                );
              }}
              selectValue={({ value: color }) =>
                dispatch(developeProductActions.selectColor({ value: color }))
              }
            />

            <SizeField sizes={sizes} />

            <AddVariantField variants={variants} />

            <InputTextarea
              id="product-description--ka"
              label="პროდუქტის აღწერა (ka)"
              message="მესიჯი"
              name="description_ka"
              placeholder="აღწერე პროდუქტი..."
              onChange={setDevelopedProduct}
            />

            <InputTextarea
              id="product-description--en"
              label="პროდუქტის აღწერა (en)"
              message="მესიჯი"
              name="description_en"
              placeholder="describe product..."
              onChange={setDevelopedProduct}
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

      {status.loading && <LoadingSpinner />}
    </Styled.AddDevelopedProduct>
  );
}
