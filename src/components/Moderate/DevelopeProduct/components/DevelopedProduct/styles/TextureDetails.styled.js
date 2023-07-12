import styled from "styled-components";

export const TextureDetails = styled.div`
  .texture-details__list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
    padding: 0.5rem;
  }

  .texture-details__list-item {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "DARK"
          ? theme.colors.gray_shade
          : theme.colors.gray_tint};
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadow.bottom_right_md_dark};

    &--texture,
    &--percentage {
      grid-column: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem 0 0;
    }

    &--texture {
      grid-row: 1;
      padding-top: 0.5rem;
    }

    &--percentage {
      grid-row: 2;
      padding-bottom: 0.5rem;
    }

    [data-edit-and-delete-buttons] {
      border-top: 1px solid
        ${({ theme }) =>
          theme.mode === "DARK"
            ? theme.colors.gray_shade
            : theme.colors.gray_tint};
      padding-top: 0.5rem;
    }
  }
`;
