import styled from "styled-components";

export const Variants = styled.div`
  padding: 2rem;
  position: relative;

  .all-variants__list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, max-content));
    gap: 3rem;
    justify-content: space-between;

    &-item {
      border-radius: 0.5rem;
      overflow: hidden;
      min-height: 20rem;
    }

    &-item--icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }) => theme.colors.white};

      svg {
        height: 3.5rem;
        width: 4rem;
      }

      svg image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-item--body {
      padding: 1rem;
      height: calc(100% - 3.5rem);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
    }

    &-item--label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    [data-edit-and-delete-buttons] {
      margin-top: auto;

      button.edit {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
