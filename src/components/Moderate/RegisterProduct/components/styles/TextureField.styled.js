import styled from "styled-components";
import { Form } from "styles/helpers";

export const TextureField = styled.div`
  ${Form.inputFiled};
  width: 100%;
  grid-column: span 2;
  display: flex;
  flex-direction: column;

  .texture-field__list {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    &-item {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      position: relative;
    }

    &-item [data-input]:has(input[type="number"]) {
      width: 40%;

      .form__input-text--box {
        flex-direction: row;
        align-items: center;

        input {
          width: 100%;
        }
      }
    }
  }

  .percentage-field {
    width: 50%;
    display: grid;
    grid-template-columns: 2rem 1fr;
    grid-template-rows: 3;
    gap: 0.5rem;
    align-items: center;

    & label {
      grid-row: 1;
      grid-column: 1;
    }

    & input {
      width: 100%;
      grid-column: 2;
      grid-row: 1;
    }

    & input::-webkit-inner-spin-button {
      display: none;
    }

    &__message {
      grid-row: 3;
      grid-column: span 2;
      transform: translateY(-0.2rem);
    }
  }
`;
