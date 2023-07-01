import styled from "styled-components";

export const Variants = styled.div`
  padding: 2rem;
  position: relative;

  .all-variants__list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, max-content));
    gap: 3rem;
    justify-content: space-between;

    &-item {
      border-radius: 0.5rem;
      overflow: hidden;
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
    }

    &-item--body {
      padding: 1rem;
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

    &-item--actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;

      &__btn {
        font-size: 2rem;
      }

      &__btn.edit {
        color: ${({ theme }) => theme.colors.white};
      }

      &__btn.delete {
        color: ${({ theme }) => theme.colors.red};
      }
    }
  }
`;
