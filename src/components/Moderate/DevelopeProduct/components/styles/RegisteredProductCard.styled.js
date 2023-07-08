import styled from "styled-components";

export const RegisteredProductCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.radial_sm_dark};
  position: relative;

  .proregistered-product--card__actions {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    font-size: 2rem;
    display: none;
    align-items: center;
    gap: 1rem;

    &-btn {
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({ theme }) => theme.colors.black_tr_05};
    }
  }

  &:hover .proregistered-product--card__actions {
    display: flex;
  }

  .registered-product--card__fig {
    width: 100%;
    height: 45%;
    background: ${({ theme }) => theme.colors.white};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .registered-product--card__details {
    height: 55%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};

    .registered-product--card__details-box {
      display: flex;
      justify-content: space-between;
    }
  }
`;
