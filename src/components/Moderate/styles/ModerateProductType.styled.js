import styled from "styled-components";
import { moderateContentBox } from "styles/helpers";

export const ModerateProductType = styled.div`
  ${moderateContentBox};
  height: calc(100vh - ${({ theme }) => theme.app.nav_h});

  .form {
    height: 100%;
    justify-content: center;
  }
`;
