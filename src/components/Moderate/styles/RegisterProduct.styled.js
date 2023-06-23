import styled from "styled-components";
import { moderateContentBox } from "styles/helpers";

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

  .button-primary {
    grid-column: span 2;
  }
`;
