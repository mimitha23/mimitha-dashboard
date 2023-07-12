import styled from "styled-components";

export const VariantDetails = styled.div`
  .variant-details__list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
    padding: 0.5rem;
  }

  .variant-details__list-item {
    display: grid;
    grid-template-columns: 4rem 1fr 4rem;
    grid-template-rows: 3;
    gap: 0.5rem;
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "DARK"
          ? theme.colors.gray_shade
          : theme.colors.gray_tint};
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadow.bottom_right_md_dark};

    &--fig {
      grid-column: 1;
      grid-row: span 2;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 0.75rem;

      svg {
        width: 3rem;
        height: 3rem;

        image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    &--type,
    &--label {
      grid-column: 2/4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem 0 0;
    }

    &--type {
      grid-row: 1;
      padding-top: 0.5rem;
    }

    &--label {
      grid-row: 2;
      padding-bottom: 0.5rem;
    }

    &--description {
      grid-column: 1/3;
      grid-row: 3;
      padding: 0.5rem;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: -2rem;
        top: -0.3rem;
        width: calc(100% + 4.5rem);
        border-top: 1px solid
          ${({ theme }) =>
            theme.mode === "DARK"
              ? theme.colors.gray_shade
              : theme.colors.gray_tint};
      }
    }

    [data-edit-and-delete-buttons] {
      grid-column: 3/4;
      grid-row: 3;
    }
  }
`;
