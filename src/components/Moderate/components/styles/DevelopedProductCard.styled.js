import styled from "styled-components";

export const DevelopedProductCard = styled.li`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.radial_sm_dark};

  .developed-product--card__fig {
    width: 100%;
    height: 45%;
    background: ${({ theme }) => theme.colors.white};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .developed-product--card__details {
    height: 55%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};

    .developed-product--card__details-box {
      display: flex;
      justify-content: space-between;
    }
  }
`;
