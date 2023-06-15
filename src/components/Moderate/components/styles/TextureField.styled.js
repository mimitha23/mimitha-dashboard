import styled from "styled-components";
import { Form } from "styles/helpers";

export const TextureField = styled.div`
  width: 100%;
  overflow: hidden;

  ${Form.label}

  .texture-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .texture-field--box {
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
