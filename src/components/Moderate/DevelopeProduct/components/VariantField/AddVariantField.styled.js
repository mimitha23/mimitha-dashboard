import styled from "styled-components";
import { Form } from "styles/helpers";

export const AddVariantField = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  ${Form.inputFiled};

  .selected-variants__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .selected-variants__item {
    display: grid;
    grid-template: repeat(2, max-content) / repeat(1, max-content, 2rem);
    column-gap: 1rem;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 0.5rem;
    padding: 0.5rem;

    &-label,
    &-type {
      grid-column: 1;
    }

    &-type {
      grid-row: 1;
      font-size: ${({ theme }) => theme.fontSize.md};
    }

    &-label {
      grid-row: 2;
      font-size: ${({ theme }) => theme.fontSize.sm};
    }

    &-close--btn {
      grid-column: 2;
      grid-row: span 2;
      align-self: self-start;
    }
  }

  .add-variant__btn {
    height: 4rem;
    border-radius: 0.5rem;
    padding: 0 1rem;
  }

  .select-variant__dropdown {
    position: absolute;
    z-index: 9;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    top: calc(100% + 1rem);
    left: 0;
    right: 0;
    top: 7.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadow.radial_lg_dark};

    &-list {
      margin-top: 0.5rem;
      ${Form.selectDropdownList};

      &--item {
        display: flex;
        flex-direction: column;

        &.selected {
          background: ${({ theme }) => theme.colors.blue};
          color: ${({ theme }) => theme.colors.white};
        }

        span:first-child {
          font-size: ${({ theme }) => theme.fontSize.md};
        }

        span:last-child {
          font-size: ${({ theme }) => theme.fontSize.sm};
        }
      }
    }
  }
`;
