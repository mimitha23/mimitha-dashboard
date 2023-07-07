import styled from "styled-components";
import { moderateContentBox } from "styles/helpers";
import { Form } from "styles/helpers";

export const RegisterProduct = styled.div`
  ${moderateContentBox};
  min-height: calc(100vh - ${({ theme }) => theme.app.nav_h});
  position: relative;

  .form {
    width: auto;
    max-width: 50rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 3rem;
    align-items: start;
  }

  .is-editable__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    ${Form.label};
    ${Form.error};

    .is-editable__field {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  }

  .button-primary {
    grid-column: span 2;
  }
`;
