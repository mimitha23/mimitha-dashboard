import styled from "styled-components";
import { moderateContentBox } from "styles/helpers";

export const AddDevelopedProduct = styled.div`
  ${moderateContentBox};
  min-height: calc(100vh - ${({ theme }) => theme.app.nav_h});

  .add-developed--product__content {
    width: 100%;
    display: flex;
    margin-top: 2rem;
    padding: 2rem 0;
  }

  .add-developed--product__form-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;

    .form {
      width: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .button-primary,
    .form__input-text.form__input-file,
    .form__input-text.form__input-text.form__input--textarea,
    .variants {
      grid-column: span 2;
    }
  }
`;
