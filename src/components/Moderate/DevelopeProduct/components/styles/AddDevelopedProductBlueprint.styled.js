import styled from "styled-components";

export const AddDevelopedProductBlueprint = styled.div`
  position: sticky;
  top: calc(${({ theme }) => theme.app.nav_h} + 1rem);
  align-self: flex-start;
  flex: 1;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.bg};
  min-height: calc(100vh - 4rem - ${({ theme }) => theme.app.nav_h});
  padding: 1rem;
  border-radius: 0.5rem;

  .add-developed--product__assets-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, max-content));
    gap: 1rem;

    .add-developed--product__assets-item {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colors.gray_shade};
      border-radius: 0.5rem;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        object-fit: contain;
      }
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
