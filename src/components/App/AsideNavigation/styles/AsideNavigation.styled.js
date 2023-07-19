import styled from "styled-components";

export const AsideNavigation = styled.aside`
  width: 34rem;
  padding: 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.text};
  height: calc(100vh - ${({ theme }) => theme.app.nav_h});
  position: sticky;
  top: ${({ theme }) => theme.app.nav_h};

  .app__main-nav {
    .app__main-nav--list {
      &__item {
        width: 100%;
      }
    }
  }
`;
