import styled from "styled-components";

export const DevelopedProduct = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) =>
    theme.mode === "DARK" ? theme.colors.text : theme.colors.gray_shade};
  color: ${({ theme }) => theme.colors.dark_gray};
  height: calc(100vh - 12rem - ${({ theme }) => theme.app.nav_h});
  overflow: auto;
  border-radius: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  .developed-product__header {
    display: flex;
    justify-content: flex-end;

    &-close--btn {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.dark_gray};
    }
  }

  .developed-product__main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .developed-product__details {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;

    .developed-product__details-box {
      display: grid;
      grid-template-columns: max-content 1fr;
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
