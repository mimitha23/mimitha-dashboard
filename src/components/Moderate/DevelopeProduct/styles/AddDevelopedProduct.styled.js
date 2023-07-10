import styled from "styled-components";
import { moderateContentBox } from "styles/helpers";

export const AddDevelopedProduct = styled.div`
  ${moderateContentBox};
  min-height: calc(100vh - ${({ theme }) => theme.app.nav_h});
  padding: 2rem;

  .add-developed--product__content {
    width: 100%;
    display: flex;
    margin-top: 2rem;
  }

  .add-developed--product__form-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .form {
      width: 100%;
      display: grid;
      margin-right: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }

    .button-primary,
    .form__input-text.form__input-file,
    .form__input-text.form__input-text.form__input--textarea,
    .variants {
      grid-column: span 2;
    }

    [data-input-file-review] {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;

      figure {
        width: 5rem;
        height: 5rem;
        aspect-ratio: 1/1;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
