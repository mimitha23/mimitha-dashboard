import styled from "styled-components";

export const DevelopedProducts = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .developed-products__container {
    display: flex;
    gap: 3rem;
  }

  .developed-products__aside {
    position: sticky;
    top: calc(${({ theme }) => theme.app.nav_h} + 1rem);
    align-self: flex-start;
    width: 50rem;
  }
`;
