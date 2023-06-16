import styled from "styled-components";

export const RegisteredProductsList = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.app.nav_h});
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .registered-products__filter-box {
    position: sticky;
    top: ${({ theme }) => theme.app.nav_h};
    background: ${({ theme }) => theme.colors.bg};
    padding: 1rem 1rem 2rem 1rem;
  }

  .registered-products__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max-content, 30rem));
    grid-auto-rows: 32rem;
    justify-content: space-between;
    gap: 3rem 1rem;
    padding: 0 1rem 2rem;
  }
`;
