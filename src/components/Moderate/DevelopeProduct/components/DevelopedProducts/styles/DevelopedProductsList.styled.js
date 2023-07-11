import styled from "styled-components";

export const DevelopedProductsList = styled.div`
  flex: 1;
  position: relative;

  .developed-products__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max-content, 30rem));
    grid-auto-rows: 32rem;
    justify-content: space-between;
    gap: 3rem 1rem;
  }
`;
