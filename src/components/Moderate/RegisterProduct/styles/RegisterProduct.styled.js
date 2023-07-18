import styled from "styled-components";
import { moderateContentBox } from "styles/helpers";
import { Form } from "styles/helpers";

export const RegisterProduct = styled.div`
  ${moderateContentBox};
  min-height: calc(100vh - ${({ theme }) => theme.app.nav_h});
  position: relative;

  .form {
    width: auto;
    height: 100%;
    max-width: 50rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 3rem;
    align-content: center;
    align-items: start;

    [data-input-filtrable-select]:has([name="category"]) {
      grid-column: span 2;
    }
  }

  & > .form [data-input-file] {
    grid-column: span 2;

    & [data-input-file-review] {
      height: 20rem;

      figure {
        height: 90%;
        width: auto;
        border-radius: 0.5rem;
        overflow: hidden;

        img {
          height: 100%;
        }
      }
    }
  }

  .is-editable__box {
    grid-column: span 2;
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
