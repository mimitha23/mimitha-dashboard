/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRegisterProductForm,
  selectRegisterProductStatus,
  selectRegisterProductFormSugestions,
} from "store/selectors/moderate/registerProductSelectors";
import { useRegisterProductQuery } from "hooks/api/moderate";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import { PATHS } from "config/routes";

import {
  Form,
  Button,
  InputFile,
  InputFilterableSelect,
  InputMultipleFilterableSelect,
  LoadingSpinner,
} from "components/layouts";
import TextureField from "./components/TextureField";
import WarningField from "./components/WarningField";
import ModerateHeader from "../components/ModerateHeader";
import * as Styled from "./styles/RegisterProduct.styled";

export default function RegisterProduct() {
  const dispatch = useDispatch();
  const { registerProductQuery, error } = useRegisterProductQuery();

  const {
    gender,
    productTypes: selectedTypes,
    seasons: selectedSeasons,
    productStyles: selectedStyles,
    isEditable,
  } = useSelector(selectRegisterProductForm);
  const {
    gender: genders,
    productStyles,
    productTypes,
    seasons,
  } = useSelector(selectRegisterProductFormSugestions);
  const status = useSelector(selectRegisterProductStatus);

  const setSelectable = useCallback(({ key, value }) => {
    dispatch(registerProductActions.setSelectable({ key, value }));
  }, []);

  const setMultipleSelectable = useCallback(({ key, value }) => {
    dispatch(registerProductActions.setMultipleSelectable({ key, value }));
  }, []);

  useEffect(() => {
    dispatch(registerProductActions.getRegisterProductFormSugestions());

    return () => {
      dispatch(registerProductActions.resetState());
    };
  }, []);

  const fileRef = useRef();

  return (
    <Styled.RegisterProduct>
      <ModerateHeader
        title="დაარეგისტრირე პროდუქტი"
        linkCaption="ნახე ყველა რეგისტრირებული პროდუქტი"
        redirectPath={
          PATHS.moderate_sidebar.registeredProductsPage.absolutePath
        }
      />

      <Form>
        <InputFilterableSelect
          id="product-type"
          label="პროდუქტის ტიპი"
          name="productTypes"
          placeholder="აირჩიეთ პროდუქტის ტიპი"
          error={error.productTypes.hasError}
          message={error.productTypes.message}
          value={selectedTypes?.caption || ""}
          setValue={setSelectable}
          list={productTypes}
        />

        <InputMultipleFilterableSelect
          id="style"
          label="სტილი"
          name="productStyles"
          placeholder="აირჩიეთ სტილი"
          error={error.productStyles.hasError}
          message={error.productStyles.message}
          selectedFields={selectedStyles}
          selectField={setMultipleSelectable}
          list={productStyles}
        />

        <InputMultipleFilterableSelect
          id="season"
          label="სეზონი"
          name="seasons"
          placeholder="აირჩიეთ სეზონი"
          error={error.seasons.hasError}
          message={error.seasons.message}
          selectedFields={selectedSeasons}
          selectField={setMultipleSelectable}
          list={seasons}
        />

        <InputFilterableSelect
          id="gender"
          label="გენდერი"
          name="gender"
          placeholder="აირჩიეთ გენდერი"
          readOnly={true}
          error={error.gender.hasError}
          message={error.gender.message}
          value={gender?.caption || ""}
          setValue={setSelectable}
          list={genders}
        />

        <TextureField error={error.textures} />

        <WarningField error={error.warnings} />

        <div className="is-editable__box">
          <div className="is-editable__field">
            <input
              type="checkbox"
              id="is-editable"
              checked={isEditable}
              onChange={(e) =>
                dispatch(registerProductActions.setIsEditable(e.target.checked))
              }
            />
            <label htmlFor="is-editable">Is Editable</label>
          </div>

          {error.isEditable.hasError && <p>{error.isEditable.message}</p>}
        </div>

        <InputFile
          name="icon"
          label="აირჩიეთ პროდუქტის მინიატურა"
          fileRef={fileRef}
          // file={newIcon || icon}
          // message={error.icon.message}
          // error={error.icon.hasError}
          // onChange={handleManualSetVariant}
        />

        <Button
          caption="შექმნა"
          disabled={status.loading}
          onClick={(e) => {
            e.preventDefault();
            registerProductQuery();
          }}
        />
      </Form>

      {status.loading && <LoadingSpinner />}
    </Styled.RegisterProduct>
  );
}
