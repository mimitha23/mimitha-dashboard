import styled from "styled-components";

export const DevelopedProductActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;

  .developed-product--actions__btn {
    padding: 1rem;
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.25s ease;

    &.delete {
      background: ${({ theme }) => theme.colors.red};
    }

    &.edit {
      background: ${({ theme }) => theme.colors.blue};
    }

    &:hover {
      filter: brightness(115%);
    }
  }
`;
