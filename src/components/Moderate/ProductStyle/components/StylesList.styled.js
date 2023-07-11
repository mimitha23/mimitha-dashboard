import styled from "styled-components";

export const StylesList = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, max-content));
  gap: 3rem;
  justify-content: space-between;

  .all-product--styles__list-item {
    border-radius: 0.5rem;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    &--label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  [data-edit-and-delete-buttons] {
    margin-top: auto;

    button.edit {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
