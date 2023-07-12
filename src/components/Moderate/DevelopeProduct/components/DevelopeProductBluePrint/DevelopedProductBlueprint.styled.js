import styled from "styled-components";

export const DevelopedProductBlueprint = styled.div`
  position: sticky;
  top: calc(${({ theme }) => theme.app.nav_h} + 1rem);
  align-self: flex-start;
  flex: 1;
  background: ${({ theme }) =>
    theme.mode === "DARK" ? theme.colors.text : theme.colors.gray_shade};
  color: ${({ theme }) => theme.colors.dark_gray};
  min-height: calc(100vh - 4rem - ${({ theme }) => theme.app.nav_h});
  padding: 1rem;
  border-radius: 0.5rem;

  .is-empty-part {
    opacity: 0.5;
  }

  .add-developed--product__assets-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, 12rem);
    padding: 1rem;
    gap: 1rem;
    min-height: 12rem;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray_shade};

    .add-developed--product__assets-item {
      width: 100%;
      height: 12rem;
      border: 1px solid ${({ theme }) => theme.colors.gray_shade};
      border-radius: 0.5rem;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .no-files--message {
      grid-column: 1/-1;
      justify-self: center;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      font-weight: 900;
    }
  }

  .registered-product--card__details {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    .registered-product--card__details-box {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0.5rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;

      &:hover {
        background: ${({ theme }) => theme.colors.blue};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
