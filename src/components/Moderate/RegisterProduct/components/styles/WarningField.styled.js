import styled from "styled-components";
import { Form } from "styles/helpers";

export const WarningField = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${Form.label};
  ${Form.error};

  .fields-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .warning-fields--box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;

    [data-input] .form__input-text--box {
      flex-direction: row;
      align-items: center;

      input {
        width: 100%;
      }
    }
  }
`;
