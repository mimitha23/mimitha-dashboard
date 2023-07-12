import styled from "styled-components";

export const DevelopedProductSlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .developed-product__fig {
    position: relative;
    height: 25rem;
    width: 100%;
    aspect-ratio: 1/1;
    background: inherit;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .developed-product__slider-btn--box {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      width: 4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.black_tr_05};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
