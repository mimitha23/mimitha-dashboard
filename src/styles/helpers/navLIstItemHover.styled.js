import { css } from "styled-components";

const navListItemHover = css`
  transition: all 0.2s ease;

  &.nav--link__active {
    color: ${({ theme }) => theme.colors.blue};
  }

  &:not(.nav--link__active):hover {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export default navListItemHover;
