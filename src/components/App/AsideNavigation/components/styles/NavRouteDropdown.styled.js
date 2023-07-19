import styled from "styled-components";

export const NavRouteDropdown = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .nav-dropdown__btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.active {
      color: ${({ theme }) => theme.colors.blue};
    }

    &:not(.active):hover {
      color: ${({ theme }) => theme.colors.green};
    }
  }

  .nav-dropdown__list {
    width: 100%;
    padding-left: 2rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li a {
      width: 100%;

      &.active {
        color: ${({ theme }) => theme.colors.blue};
      }

      &:not(.active):hover {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }
`;
