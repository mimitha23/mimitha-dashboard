import styled from "styled-components";

export const DevelopedProductsHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .developed-products--list__title {
    font-size: ${({ theme }) => theme.fontSize.h3};
  }

  .add-developed--product__btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    border-radius: 0.5rem;

    &-icon {
      height: 1.5rem;
    }
  }
`;
