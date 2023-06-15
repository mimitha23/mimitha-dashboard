import styled from "styled-components";
import navListItemHover from "styles/helpers/navLIstItemHover.styled";

export const ModerateNavigation = styled.aside`
  padding: 2rem 3rem 1rem 3rem;
  border-right: 1px solid ${({ theme }) => theme.colors.text};
  width: 35rem;
  height: calc(100vh - ${({ theme }) => theme.app.nav_h});

  .moderate-nav__list {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & li,
    & a {
      width: 100%;
    }

    & a {
      display: inline-block;
      ${navListItemHover}
    }
  }
`;
