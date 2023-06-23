import styled from "styled-components";
import { Form } from "styles/helpers";

export const TextureField = styled.div`
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

  ${Form.label};

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
    grid-column: span 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-right: 0.2rem;
    padding-bottom: 0.2rem;
    ${Form.input};
  }

  .texture-field {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      width: 100%;
    }
  }

  .percentage-field {
    display: flex;
    gap: 1rem;
    align-items: center;

    & input {
      width: 100%;
    }

    & input::-webkit-inner-spin-button {
      display: none;
    }
  }

  .texture-field,
  .percentage-field {
    label {
      width: 2rem;
    }
  }
`;
