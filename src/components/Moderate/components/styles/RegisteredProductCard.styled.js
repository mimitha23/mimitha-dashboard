import styled from "styled-components";

export const RegisteredProductCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;

  .registered-product__fig {
    width: 100%;
    height: 45%;
    background: ${({ theme }) => theme.colors.white};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .registered-product__details {
    height: 55%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.blue};

    .registered-product__details-box {
      display: flex;
      justify-content: space-between;
    }
  }
`;
