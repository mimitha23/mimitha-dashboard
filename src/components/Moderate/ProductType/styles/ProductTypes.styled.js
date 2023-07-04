import styled from "styled-components";

export const ProductTypes = styled.div`
  padding: 2rem;
  position: relative;

  .all-product--types__list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, max-content));
    gap: 3rem;
    justify-content: space-between;

    &-item {
      border-radius: 0.5rem;
      overflow: hidden;
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    &-item--label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    &-item--actions {
      margin-top: auto;
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
