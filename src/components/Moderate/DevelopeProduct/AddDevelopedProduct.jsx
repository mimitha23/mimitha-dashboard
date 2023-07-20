/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectDevelopeProductForm,
  selectDevelopeProductStatus,
  selectDevelopedProductAssets,
  selectDevelopeProductFormSuggestions,
} from "store/selectors/moderate/developeProductSelectors";
import { useDevelopeProductQuery } from "hooks/api/moderate";
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
  InputCheckBox,
  FormHeader,
} from "components/layouts";
import DevelopedProductBlueprint from "./components/DevelopeProductBluePrint/DevelopedProductBlueprint";
import AddVariantField from "./components/VariantField/AddVariantField";
import SizeField from "./components/SizeField/SizeField";
import CopyDevelopedProductConfig from "./components/CopyDevelopedProductConfig/CopyDevelopedProductConfig";
import * as Styled from "./styles/AddDevelopedProduct.styled";

export default function AddDevelopedProduct() {
  const dispatch = useDispatch();

  const { registeredProductId } = useParams();

  const status = useSelector(selectDevelopeProductStatus);
  const assets = useSelector(selectDevelopedProductAssets);
  const developeForm = useSelector(selectDevelopeProductForm);
  const { colors, sizes } = useSelector(selectDevelopeProductFormSuggestions);

  const filesRef = useRef(null);

  const { developeProductQuery, error } = useDevelopeProductQuery();

  function setDevelopedProduct(e) {
    dispatch(
      developeProductActions.setDevelopedProduct({
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  function setColor({ value: enteredValue }) {
    dispatch(developeProductActions.setColor({ value: enteredValue }));
  }

  function selectColor({ value: color }) {
    dispatch(developeProductActions.selectColor({ value: color }));
  }

  function setCheckbox(e) {
    dispatch(
      developeProductActions.setCheckbox({
        key: e.target.name,
        value: e.target.checked,
      })
    );
  }

  function onAddFile({ value }) {
    dispatch(developeProductActions.setAssets(value));
    filesRef.current.value = "";
  }

  function onRemoveFile(file) {
    dispatch(developeProductActions.removeAsset(file));
  }

  function onSubmit(e) {
    e.preventDefault();
    developeProductQuery();
  }

  useEffect(() => {
    dispatch(developeProductActions.getDevelopeProductFormSuggestions());

    return () => {
      dispatch(developeProductActions.resetState());
    };
  }, []);

  return (
    <Styled.AddDevelopedProduct>
      <FormHeader
        title="განავითარე პროდუქტი"
        linkCaption="ნახე ყველა მიმაგრებული პროდუქტი"
        redirectPath={PATHS.moderate_nested_routes.developedProductsPage.absolutePath(
          { registeredProductId }
        )}
      />

      <div className="add-developed--product__content">
        <div className="add-developed--product__form-wrapper">
          {!developeForm.isUpdating && <CopyDevelopedProductConfig />}
          <Form>
            <InputText
              id="product-title_ka"
              label="პროდუქტის სათაური (ka)"
              name="title_ka"
              placeholder="შავი ჰუდი ჯიბით"
              value={developeForm.title_ka}
              error={error.title_ka.hasError}
              message={error.title_ka.message}
              onChange={setDevelopedProduct}
            />

            <InputText
              id="product-title_en"
              label="პროდუქტის სათაური (en)"
              placeholder="black hoody with pocket"
              name="title_en"
              value={developeForm.title_en}
              error={error.title_en.hasError}
              message={error.title_en.message}
              onChange={setDevelopedProduct}
            />

            <InputText
              id="product-price"
              label="პროდუქტის ფასი"
              name="price"
              placeholder="30"
              type="number"
              value={developeForm.price}
              error={error.price.hasError}
              message={error.price.message}
              onChange={setDevelopedProduct}
            />

            <InputFilterableSelect
              id="color"
              label="ფერი"
              name="color"
              placeholder="ლურჯი"
              list={colors}
              value={developeForm.color?.caption || ""}
              setValue={setColor}
              selectValue={selectColor}
              error={error.color.hasError}
              message={error.color.message}
            />

            <SizeField sizes={sizes} error={error.sizes} />

            <AddVariantField error={error.variants} />

            <InputTextarea
              id="product-description--ka"
              label="პროდუქტის აღწერა (ka)"
              name="description_ka"
              placeholder="აღწერე პროდუქტი..."
              value={developeForm.description_ka}
              error={error.description_ka.hasError}
              message={error.description_ka.message}
              onChange={setDevelopedProduct}
            />

            <InputTextarea
              id="product-description--en"
              label="პროდუქტის აღწერა (en)"
              name="description_en"
              placeholder="describe product..."
              value={developeForm.description_en}
              error={error.description_en.hasError}
              message={error.description_en.message}
              onChange={setDevelopedProduct}
            />

            <InputCheckBox
              id="is-public"
              name="isPublic"
              checked={developeForm.isPublic}
              error={error.isPublic}
              onChange={setCheckbox}
              label="არი საჯარო"
            />

            <InputCheckBox
              id="is-featured"
              checked={developeForm.isFeatured}
              name="isFeatured"
              value={developeForm.isFeatured}
              error={error.isFeatured}
              onChange={setCheckbox}
              label="is featured"
            />

            <InputFile
              name="newAssets"
              label="დაამატეთ პროდუქტის მედია ფაილები"
              fileRef={filesRef}
              file={assets.assets}
              multiple={true}
              onChange={onAddFile}
              onRemoveFile={onRemoveFile}
              message={
                error.filesToUpload?.hasError
                  ? error.filesToUpload.message
                  : error.filesToDelete?.hasError
                  ? error.filesToDelete.message
                  : ""
              }
              error={
                error.filesToUpload?.hasError || error.filesToDelete?.hasError
              }
            />

            <Button
              caption={developeForm.isUpdating ? "განახლება" : "შექმნა"}
              disabled={status.loading}
              onClick={onSubmit}
            />
          </Form>
        </div>

        <DevelopedProductBlueprint />
      </div>

      {status.loading && <LoadingSpinner />}
    </Styled.AddDevelopedProduct>
  );
}
