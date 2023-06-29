import styled from "styled-components";

export const DevelopedProduct = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - ${({ theme }) => theme.app.nav_h} - 1rem);
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};

  .developed-product__header {
    display: flex;
    justify-content: flex-end;

    &-close--btn {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.bg};
    }
  }

  .developed-product__main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .developed-product__fig {
    height: 20rem;
    aspect-ratio: 1/1;
    background: ${({ theme }) => theme.colors.white};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .developed-product__details {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;

    .developed-product__details-box {
      display: grid;
      grid-template-columns: 3rem max-content 1fr;
      gap: 1rem;
      align-items: center;

      button {
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
      }

      & > :last-child {
        justify-self: flex-end;
      }
    }
  }
`;
