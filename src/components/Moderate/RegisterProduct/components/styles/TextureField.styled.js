import styled from "styled-components";
import { Form } from "styles/helpers";

export const TextureField = styled.div`
  ${Form.inputFiled};
  width: 100%;
  grid-column: span 2;
  display: flex;
  flex-direction: column;

  .texture-head {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .add-texture--field__btn {
      font-size: ${({ theme }) => theme.fontSize.md};
      display: flex;
      align-items: center;
      gap: 0.75rem;

      span {
        line-height: 1;
      }

      span:last-child {
        display: flex;
        align-items: center;
        margin-top: 0.4rem;
      }
    }
  }

  .texture-field--box {
    display: flex;
    gap: 1.5rem;
  }

  .percentage-field {
    width: 50%;
    display: grid;
    grid-template-columns: 2rem 1fr;
    grid-template-rows: 3;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;

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
