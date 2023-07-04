import styled from "styled-components";
import { Form } from "styles/helpers";

export const TextureField = styled.div`
  ${Form.inputFiled};
  width: 100%;
  overflow: hidden;
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;

  &.filled-texture {
    .texture-field--box {
      grid-column: span 1;
    }
  }

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
    flex-direction: column;
    gap: 0.5rem;
  }

  .texture-field,
  .percentage-field {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: 2;
    gap: 1rem;
    align-items: center;

    & label {
      width: 2rem;
    }

    & input {
      width: 100%;
    }

    & input::-webkit-inner-spin-button {
      display: none;
    }

    &__message {
      grid-row: 2;
      grid-column: span 2;
      transform: translateY(-0.2rem);
    }
  }
`;
