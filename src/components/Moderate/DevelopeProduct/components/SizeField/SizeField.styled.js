import styled from "styled-components";

export const SizeField = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .size-field__inputs-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .size-field__inputs {
      display: grid;
      grid-template-columns: 1fr 15rem;
      align-items: start;
      align-content: start;
      gap: 2rem;
      position: relative;
    }
  }
`;
