import styled from "styled-components";
// import { buttonPrimary } from "styles/helpers/index";

export const FilterToggle = styled.div`
  display: none;
  font-size: ${({ theme }) => theme.fontSize.lg};

  .toggle-filter__btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-transform: capitalize;
    transition: all 0.2s ease;

    span:last-child {
      line-height: 1;
      font-size: 2.5rem;

      svg {
        transform: translateY(0.25rem);
      }
    }

    &.hide-btn {
      text-decoration: underline;
    }

    &.show-btn {
      border-radius: 0.5rem;
    }
  }
`;
