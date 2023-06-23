/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRegisterProduct,
  selectRegisterProductStatus,
} from "store/selectors/moderateSelectors";
import { useRegisterProductQuery } from "hooks/api/moderate";
import { registerProductActions } from "store/reducers/moderate/registerProductReducer";

import {
  Form,
  Button,
  InputFilterableSelect,
  InputMultipleFilterableSelect,
  LoadingSpinner,
} from "components/layouts";
import TextureField from "./components/TextureField";
import WarningField from "./components/WarningField";
import * as Styled from "./styles/RegisterProduct.styled";

const seasons = [
  { _id: nanoid(), caption: "გაზაფხული" },
  { _id: nanoid(), caption: "ზაფხული" },
  { _id: nanoid(), caption: "შემოდგომა" },
  { _id: nanoid(), caption: "ზამთარი" },
];

const productTypes = [
  { _id: nanoid(), caption: "hoody" },
  { _id: nanoid(), caption: "trousers" },
  { _id: nanoid(), caption: "cargo trousers" },
  { _id: nanoid(), caption: "jacket" },
  { _id: nanoid(), caption: "coat" },
  { _id: nanoid(), caption: "shirt" },
  { _id: nanoid(), caption: "t-shirt" },
];

const styles = [
  { _id: nanoid(), caption: "ყოველდღიური" },
  { _id: nanoid(), caption: "სპორტული" },
  { _id: nanoid(), caption: "მსუბუქი" },
];

const genders = [
  { _id: nanoid(), caption: "მამაკაცი" },
  { _id: nanoid(), caption: "ქალბატონი" },
  { _id: nanoid(), caption: "ორივენიცა" },
];

export default function RegisterProduct() {
  const dispatch = useDispatch();
  const { registerProductQuery, error } = useRegisterProductQuery();

  const {
    gender,
    productType,
    seasons: selectedSeasons,
    styles: selectedStyles,
  } = useSelector(selectRegisterProduct);
  const status = useSelector(selectRegisterProductStatus);

  const setRegisterProductValue = useCallback(({ key, value }) => {
    dispatch(registerProductActions.setRegisterProductValue({ key, value }));
  }, []);

  const setStyle = useCallback((value) => {
    dispatch(registerProductActions.setStyle(value));
  }, []);

  const setSeason = useCallback((value) => {
    dispatch(registerProductActions.setSeason(value));
  }, []);

  return (
    <Styled.RegisterProduct>
      <h4 className="moderator-title">დაარეგისტრირე პროდუქტი</h4>
      <Form>
        <InputFilterableSelect
          id="product-type"
          label="პროდუქტის ტიპი"
          name="productType"
          placeholder="აირჩიეთ პროდუქტის ტიპი"
          error={error.productType.hasError}
          message={error.productType.message}
          value={productType}
          setValue={setRegisterProductValue}
          list={productTypes}
        />

        <InputMultipleFilterableSelect
          id="style"
          label="სტილი"
          name="style"
          placeholder="აირჩიეთ სტილი"
          error={false}
          message="მესიჯი"
          selectedFields={selectedStyles}
          selectField={setStyle}
          list={styles}
        />

        <InputMultipleFilterableSelect
          id="season"
          label="სეზონი"
          name="season"
          placeholder="აირჩიეთ სეზონი"
          message="მესიჯი"
          error={false}
          selectedFields={selectedSeasons}
          selectField={setSeason}
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
          value={gender}
          setValue={setRegisterProductValue}
          list={genders}
        />

        <TextureField />

        <WarningField />

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
