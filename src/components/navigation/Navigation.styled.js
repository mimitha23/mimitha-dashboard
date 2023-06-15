import styled from "styled-components";
import { navLIstItemHover } from "styles/helpers";

export const Navigation = styled.nav`
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  height: ${({ theme }) => theme.app.nav_h};
  overflow: hidden;

  .main-nav__list {
    display: flex;
    align-items: center;
    gap: 3rem;
    text-transform: capitalize;
  }

  a {
    ${navLIstItemHover}
  }
`;
